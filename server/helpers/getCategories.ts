import categoryActions from "context/category/categoryActions"
import categoryReducer from "context/category/categoryReducer"

function getCategories() {
    return categoryActions.getList({})
        .then(categories => {
            if (categories) {
                return categoryReducer(undefined, categories)
            }
            else {
                throw "categories get error"
            }
        })
}

export default getCategories