import React from "react";
import Profile from "../ProfileComponent";
import AddMall from "./AddMallComponent";
import { images } from "../../constants/urls";
import MallLayout from "./MallLayoutComponent";
import { Modal } from "../CustomComponents";
import MallService from "../../services/managementServices/MallService";

class AdminMall extends React.Component {

    constructor(props) {
        super(props);
        this.state = { show: false }
        this.deleteMall = this.deleteMall.bind(this);
    }

    deleteMall() {
        this.setState({show: false});
        const mallId = this.props.user.mall.mallId;
        MallService.delete(mallId)
            .then(response => response.data)
            .then(data => {
                console.log(data);
                this.props.refresh();
            })
            .catch(error => console.log(error));
        return true;
    }

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
                    <Modal title="Confirm" show={this.state.show} msg="Are you sure ? this will delete entire mall and staff data"
                        close={() => { this.setState({ show: false }) }} action={this.deleteMall}
                        ok="yes" cancel="cancel" />
                    <Profile fields={fields} title="Mall Info" img={images.mallProfile} del={() => { this.setState({ show: true }) }}
                        refresh={this.props.refresh} />
                    <MallLayout mall={mall} refresh={this.props.refresh} />
                </div>
            );
        }
    }
}

export default AdminMall;