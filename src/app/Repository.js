import mongoose from "mongoose";
import { getPaginatedRecord } from "../../../_shared/_helpers/pagination.js";

class Repository {
  constructor(Model) {
    this.Model = Model;
  }
  // --- Session/Transaction Handling ---
  async initSession() {
    return mongoose.startSession(); // reuse global connection
  }

  async startTransaction(session) {
    return session.startTransaction();
  }

  async commitTransaction(session) {
    return session.commitTransaction();
  }

  async abortTransaction(session) {
    return session.abortTransaction();
  }

  async endSession(session) {
    return session.endSession();
  }

  // --- CRUD Methods ---

  getModel() {
    return this.Model;
  }

  create(data) {
    return this.Model.create(data);
  }

  findById(id, selectedFields = null) {
    return this.Model.findById(id).select(selectedFields);
  }

  findOne(condition = {}, selectedFields = null) {
    return this.Model.findOne(condition).select(selectedFields);
  }

  find(condition = {}, selectedFields = null) {
    return this.Model.find(condition).select(selectedFields);
  }

  update(condition, update) {
    return this.Model.findOneAndUpdate(condition, update, {
      new: true,
      lean: true,
    });
  }

  updateMany(condition, update) {
    return this.Model.updateMany(condition, update);
  }

  deleteOne(condition) {
    return this.Model.deleteOne(condition);
  }

  deleteMany(condition) {
    return this.Model.deleteMany(condition);
  }

  count(condition = {}) {
    return this.Model.countDocuments(condition);
  }

  // --- Pagination ---

  all(
    limit,
    page,
    filters = {},
    selectedFields = null,
    sort = { created_at: -1 }
  ) {
    return getPaginatedRecord(this.Model, {
      limit,
      page,
      data: filters,
      selectedFields,
      sort,
    });
  }
}

export { Repository };
