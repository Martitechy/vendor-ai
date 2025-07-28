import { Repository } from "../../Repository.js";
import Vendor from "../models/vendor.js";

class VendorRepository extends Repository {
  constructor() {
    super(Vendor);
  }
}

export default new VendorRepository();
