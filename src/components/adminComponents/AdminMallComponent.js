import React from "react";
import Profile from "../ProfileComponent";
import AddMall from "./AddMallComponent";
import { images } from "../../constants/urls";
import MallLayout from "./MallLayoutComponent";

class AdminMall extends React.Component {

    render() {
        const mall = this.props.user.mall;
        if (!mall) {
            return (<AddMall user={this.props.user} refresh={this.props.refresh} />)
        }
        else {
            const fields = {
                'Name': mall.name,
                'Branch': mall.branch,
                'Cost per Space': 'Rs ' + mall.spaceCost,
                'No of floors': mall.floors.length
            };
            return (
                <div className="w-100 d-flex flex-column">
                    <Profile fields={fields} title="Mall Info" img={images.mallProfile} refresh={this.props.refresh}/>
                    <MallLayout mall={mall} refresh={this.props.refresh} />
                </div>
            );
        }
    }
}

export default AdminMall;