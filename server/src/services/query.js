/*
You see, we want to allow  any endpoint to make use of our pagination logic.
THIS QUERY FILE WILL GIVE US A REUSABLE WAY OF MAKING ANY ENDPOINT PAGINATED.
*/

// SETTING THE DEFAULT PAGE

const DEFAULT_PAGE_NUMBER = 1;

// const DEFAULT_PAGE_LIMIT = 50;  // we need to return infinit documents on the first page when there is no limit defined by the client
const DEFAULT_PAGE_LIMIT = 0; // in MongoDB when you pass 0 as the page limit, Mongo will return all of the documents in the collection.

// Calling a function which calculates the appropriate skip and limit values.
function getPagination(querry) {
  // returning skip and limit values.

  // const page = Math.abs(querry.page); // When this value is not defined then use the value on the right
  const page = Math.abs(querry.page) || DEFAULT_PAGE_NUMBER; //  .... on the first page

  // const limit = Math.abs(querry.limit); // if the querry limit is not set, ....
  const limit = Math.abs(querry.limit) || DEFAULT_PAGE_LIMIT; // All of the documents will be returned on ...... (up)

  // the Math.abs here turns a negative number to a positive number.
  // and the bonus on it is that when you pass it a string, it converts it into a number.

  // Now, how do we define the skip value?  The amount of documents that we want to skip
  // If we are on a certain page. So if we are on page 1, we want to skip 0 documents
  // because that's our first page. If we are on page 2, we want to skip the first limit
  // documents. And if we are on page 3, we want to skip the first limit times 2 documents,
  // right, because limit represents the amount of documents in one page.

  const skip = (page - 1) * limit;
  //Defining the values we want to return
  return {
    // return as an object. But why do we need to return limit values? We want to set the default
    // when we want to return only one of skip or limit objects on none of them to get all launches.
    // So, how to set default?
    skip,
    limit,
  };
}

// Exporting the function
module.exports = {
  getPagination,
};
