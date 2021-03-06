if (require.main === module) {
  require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const uuidv4 = require('uuid/v4')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const {User} = require('../models/user')
const {jwtStrategy} = require('../strategies')

mongoose.Promise = global.Promise

passport.use(jwtStrategy)

const jwtAuth = passport.authenticate('jwt', {session: false})

async function createNewDraftAndUpdateUser (draft, userId) {
  const newDraft = {...draft, courseId: uuidv4()}

  const user = await User.findByIdAndUpdate(
    userId,
    {$push: {drafts: newDraft}},
    {new: true}
  )

  return newDraft
}

router.post('/', jwtAuth, async (req, res) => {
  try {
    const newDraft = await createNewDraftAndUpdateUser(req.body, req.user.id)
    res.send(newDraft)
  } catch (err) {
    console.error(err)
  }
})

async function updateDraftInUserObject (updatedDraft, userId) {
  const userToUpdate = await User.findById(userId)

  const draftIndex = userToUpdate.drafts.findIndex(draft => draft.courseId === updatedDraft.courseId)
  userToUpdate.drafts[draftIndex] = updatedDraft

  const updatedUser = await User.findByIdAndUpdate(userId, userToUpdate, {new: true})

  return updatedUser.drafts[draftIndex]
}

router.put('/', jwtAuth, async (req, res) => {
  try {
    const updatedDraft = await updateDraftInUserObject(req.body, req.user.id)
    res.send(updatedDraft)
  } catch (err) {
    console.error(err)
  }
})

module.exports = {
  router
}
