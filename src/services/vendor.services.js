import VendorRepository from "../repository/vendor.repository.js";

class VendorService {
  constructor() {
    this.VendorRepository = VendorRepository;
  }

  // --- Transaction Session Management ---

  async initSession() {
    return this.VendorRepository.initSession();
  }

  async startTransaction(session) {
    return this.VendorRepository.startTransaction(session);
  }

  async commitTransaction(session) {
    return this.VendorRepository.commitTransaction(session);
  }

  async abortTransaction(session) {
    return this.VendorRepository.abortTransaction(session);
  }

  async endSession(session) {
    return this.VendorRepository.endSession(session);
  }

  // --- CRUD Methods ---

  async createVendor(data) {
    return this.VendorRepository.create(data);
  }

  async findVendor(condition, fields = null) {
    return this.VendorRepository.findOne(condition, fields);
  }

  async findAllVendors(limit = 10, page = 1, filter = {}, fields = null) {
    // Ensure fields is a string or object, else set to undefined
    let selectFields = undefined;
    if (fields && (typeof fields === "string" || typeof fields === "object")) {
      selectFields = fields;
    }
    // Use a paginated method if available, else fallback to find
    if (typeof this.VendorRepository.all === "function") {
      return this.VendorRepository.all(limit, page, filter, selectFields);
    }
    // Fallback: manual pagination
    const data = await this.VendorRepository.find(filter, selectFields)
      .skip((page - 1) * limit)
      .limit(limit);
    return { data };
  }

  async findVendorById(id, fields = null) {
    return this.VendorRepository.findById(id, fields);
  }

  async updateVendor(condition, update) {
    return this.VendorRepository.update(condition, update);
  }

  async updateManyVendors(condition, update) {
    return this.VendorRepository.updateMany(condition, update);
  }

  async deleteVendor(condition) {
    return this.VendorRepository.deleteOne(condition);
  }

  async deleteVendors(condition) {
    return this.VendorRepository.deleteMany(condition);
  }

  async getPaginatedVendors(limit, page, filter = {}, fields = null) {
    return this.VendorRepository.all(limit, page, filter, fields);
  }

  async countVendors(filter = {}) {
    return this.VendorRepository.count(filter);
  }
}

export default new VendorService();
