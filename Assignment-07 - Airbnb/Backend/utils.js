//Error info to user
function createErrorResult(error) {
  return { status: "error", error };
}

//create success result when request process is successfull along with success result
function createSuccessResult(data) {
  return { status: "success", data };
}

function createResult(error, data) {
  return error ? createErrorResult(error) : createSuccessResult(data);
}

//to make available all three functions in ither js files
module.exports = {
  createResult,
  createSuccessResult,
  createErrorResult,
};
