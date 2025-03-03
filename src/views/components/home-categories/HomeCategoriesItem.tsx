import URLS from "constant/routing/URLS"
import {CategoryType} from "context/category/CategoryType"
import Image from "views/components/image/Image"
import MaterialLink from "views/components/material/MaterialLink"

function HomeCategoriesItem({data}: { data: CategoryType }) {
    const {name, image, id} = data
    return (
        <MaterialLink className="home-categories-list-item" link={{to: URLS.mainContainer.routes.projectsLink(id)}}>
            <Image className="home-categories-list-item-img" src={image} alt={name} resize={{size: 200}}/>
            <div className="home-categories-list-item-title">{name}</div>
        </MaterialLink>
    )
}

export default HomeCategoriesItem
