// tests/vendor/vendor.controller.spec.js
import { expect } from "chai";
import sinon from "sinon";
import { faker } from "@faker-js/faker";
import VendorRepository from "../../src/app/modules/repository/vendor.repository.js";
import VendorService from "../../src/app/modules/services/vendor.services.js";

describe("VendorService", () => {
  afterEach(() => sinon.restore());

  it("should create a vendor", async () => {
    const fakeData = {
      businessName: faker.company.name(),
      phone: faker.phone.number("080########"),
    };

    const stub = sinon.stub(VendorRepository, "create").resolves(fakeData);

    const result = await VendorService.createVendor(fakeData);

    expect(stub.calledOnce).to.be.true;
    expect(result.phone).to.equal(fakeData.phone);
  });

  it("should find a vendor by ID", async () => {
    const fakeVendor = {
      _id: faker.database.mongodbObjectId(),
      businessName: faker.company.name(),
    };

    const stub = sinon.stub(VendorRepository, "findById").resolves(fakeVendor);

    const result = await VendorService.findVendorById(fakeVendor._id);

    expect(stub.calledOnce).to.be.true;
    expect(result._id).to.equal(fakeVendor._id);
  });

  it("should update a vendor", async () => {
    const vendorId = faker.database.mongodbObjectId();
    const updates = { businessName: "Updated Name" };

    const updatedVendor = {
      _id: vendorId,
      ...updates,
    };

    const stub = sinon.stub(VendorRepository, "update").resolves(updatedVendor);

    const result = await VendorService.updateVendor({ _id: vendorId }, updates);

    expect(stub.calledOnce).to.be.true;
    expect(result.businessName).to.equal("Updated Name");
  });

  it("should delete a vendor", async () => {
    const vendorId = faker.database.mongodbObjectId();
    const deletedVendor = { _id: vendorId, businessName: "Deleted Name" };

    const stub = sinon
      .stub(VendorRepository, "deleteOne")
      .resolves(deletedVendor);

    const result = await VendorService.deleteVendor({ _id: vendorId });

    expect(stub.calledOnce).to.be.true;
    expect(result._id).to.equal(vendorId);
  });
});
