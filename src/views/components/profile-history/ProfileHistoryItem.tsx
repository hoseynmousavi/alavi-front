function ProfileHistoryItem({title, date, price}: { title: string, date: string, price: string }) {
    return (
        <div className="profile-history-item">
            <div className="profile-history-item-first">
                <div>{title}</div>
                <div>{date}</div>
            </div>
            <div className="profile-history-item-price">{price}</div>
        </div>
    )
}

export default ProfileHistoryItem
