const getEndPointRecipesAPI = (type, search) => (
  fetch(`https://www.${type}.com/api/json/v1/1/${search}`)
    .then((response) => (
      response
        .json()
        .then((json) => (
            response.ok
                ? Promise.resolve(json)
                : Promise.reject(json)))
    ))
);

export default getEndPointRecipesAPI;
