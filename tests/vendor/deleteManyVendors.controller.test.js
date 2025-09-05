import { deleteManyVendor } from "./deleteManyVendors.controller.js";
import Vendor from "../models/vendor.js";
import { HTTP } from "../_shared/_constants/http.js";
import sinon from "sinon";
import chai from "chai";

const { expect } = chai;

describe("deleteManyVendor controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should delete all vendors and return success response", async () => {
    const deletedCount = 5;
    sinon.stub(Vendor, "deleteMany").resolves({ deletedCount });

    // Mock createResponse to call res.status and res.json
    const createResponse = (msg, data) => (r, status) => {
      r.status(status).json({ message: msg, ...data });
    };
    // Replace the actual import with our mock
    const proxyquire = await import("proxyquire");
    const { deleteManyVendor: testedDeleteManyVendor } =
      proxyquire.noCallThru()("./deleteManyVendors.controller.js", {
        "../models/vendor.js": { default: Vendor },
        "../_shared/_helpers/createResponse.js": { createResponse },
      });

    await testedDeleteManyVendor(req, res, next);

    expect(res.status.calledWith(HTTP.OK)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: "All vendors deleted successfully",
        deletedCount,
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should call next with error if deletion fails", async () => {
    const error = new Error("DB error");
    sinon.stub(Vendor, "deleteMany").rejects(error);

    await deleteManyVendor(req, res, next);

    expect(next.calledOnce).to.be.true;
    const errArg = next.firstCall.args[0];
    expect(errArg).to.have.property("statusCode", HTTP.INTERNAL_SERVER_ERROR);
    expect(errArg).to.have.property("message", "Failed to delete all vendors");
  });

  it("should call next with error if confirmDeleteAll is not provided", async () => {
    req.body = {}; // confirmDeleteAll missing

    await deleteManyVendor(req, res, next);

    expect(next.calledOnce).to.be.true;
    const errArg = next.firstCall.args[0];
    expect(errArg).to.have.property("statusCode", HTTP.BAD_REQUEST);
    expect(errArg).to.have.property(
      "message",
      "Confirmation required to delete all vendors"
    );
  });

  it("should proceed with deletion when confirmDeleteAll is true", async () => {
    req.body = { confirmDeleteAll: true };
    const deletedCount = 3;
    sinon.stub(Vendor, "deleteMany").resolves({ deletedCount });

    // Mock createResponse to call res.status and res.json
    const createResponse = (msg, data) => (r, status) => {
      r.status(status).json({ message: msg, ...data });
    };
    const proxyquire = await import("proxyquire");
    const { deleteManyVendor: testedDeleteManyVendor } =
      proxyquire.noCallThru()("./deleteManyVendors.controller.js", {
        "../models/vendor.js": { default: Vendor },
        "../_shared/_helpers/createResponse.js": { createResponse },
      });

    await testedDeleteManyVendor(req, res, next);

    expect(res.status.calledWith(HTTP.OK)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: "All vendors deleted successfully",
        deletedCount,
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });


});
