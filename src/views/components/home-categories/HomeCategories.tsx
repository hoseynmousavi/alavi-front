import useGetCategoriesList from "context/category/hooks/useGetCategoriesList"
import getTextConstant from "helpers/general/getTextConstant"
import HomeCategoriesItem from "views/components/home-categories/HomeCategoriesItem"

function HomeCategories() {
    const {textConstant} = getTextConstant()
    const {data} = useGetCategoriesList()
    return (
        <div className="home-categories">
            <div className="home-categories-header">{textConstant.categories}</div>
            <div className="home-categories-list">
                {
                    data.map(data =>
                        <HomeCategoriesItem key={data.id} data={data}/>,
                    )
                }
            </div>
        </div>
    )
}

export default HomeCategories