// const { model } = require("mongoose");
export const getPaginatedRecord = async (
  model,
  {
    limit: specifiedLimit = 10,
    page,
    data = {},
    selectedFields,
    sortFilter = {},
  }
) => {
  try {
    const limit = Math.min(specifiedLimit, 100); //Limited to 100
    const offset = 0 + (Math.abs(page || 1) - 1) * limit;
    const modelData = await model.find({ ...data }).countDocuments();
    const result = await model
      .find({ ...data })
      .select(selectedFields ? selectedFields : "")
      .skip(offset)
      .limit(limit)
      .sort(sortFilter);
    return {
      data: result,
      pagination: {
        pageSize: limit, //Content to be seen per page
        totalCount: modelData,
        pageCount: Math.ceil(modelData / limit), // Numbers of pages made available
        currentPage: +page, // Indicates the current page being viewed
        hasNext: page * limit < modelData,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
