import {CategoryType} from "context/category/CategoryType"
import getTextConstant from "helpers/general/getTextConstant"
import HomeCategoriesItem from "views/components/home-categories/HomeCategoriesItem"

function HomeCategories({categories}: { categories: Array<CategoryType> }) {
    const {textConstant} = getTextConstant()
    return (
        <div className="home-categories">
            <div className="home-categories-header">{textConstant.categories}</div>
            <div className="home-categories-list">
                {
                    categories.map(data =>
                        <HomeCategoriesItem key={data.id} data={data}/>,
                    )
                }
            </div>
        </div>
    )
}

export default HomeCategories