import React from "react";
import Profile from "../ProfileComponent";
import AddMall from "./AddMallComponent";
import { images } from "../../constants/urls";

class AdminMall extends React.Component {

    render() {
        const mall = this.props.user.mall;
        if (!mall) {
            return (<AddMall user={this.props.user} refresh={this.props.refresh} />)
        }
        else {
            const fields = [
                {
                    key: 'Name',
                    val: mall.name
                },
                {
                    key: 'Branch',
                    val: mall.branch
                },
                {
                    key: 'Cost per space',
                    val: mall.spaceCost
                }
            ];
            return (
                <Profile fields={fields} title="Mall Info" img={images.mallProfile} />
            );
        }
    }
}

export default AdminMall;