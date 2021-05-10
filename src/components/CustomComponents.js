
import { Button as Btn, Alert as Alrt, Modal as Mdl } from 'react-bootstrap';
import { colors } from '../constants/theme';

export const Button = (props) => {
    let bg = colors.dark;
    let fg = colors.light;
    let style = null;
    switch (props.variant) {
        case 'dark':
            bg = colors.dark;
            fg = colors.light;
            break;
        case 'light':
            bg = colors.light;
            fg = colors.dark;
            break;
        default:
            bg = null;
    }

    if (bg) style = { background: bg, color: fg };

    return (
        <Btn className={props.className} type={props.type} variant={props.variant}
            onClick={props.onClick} style={style}
            disabled={props.disabled} size={props.size}>
            {props.children}
        </Btn>
    );
}

export const Alert = (props) => {

    if (!props.msg) return <></>;
    else return (
        <Alrt dismissible
            onClose={props.onClose}
            className="add-shadow-small"
            style={{ background: colors.dark, color: colors.light }}>
            {props.msg}
        </Alrt>
    );
}

export const Modal = (props) => {
    return (
        <Mdl show={props.show} onHide={props.close}>
            <Mdl.Header closeButton style={{background: colors.dark, color: colors.light}}>
                <Mdl.Title>{props.title}</Mdl.Title>
            </Mdl.Header>
            <Mdl.Body>
                {props.msg}
            </Mdl.Body>
            <Mdl.Footer>
                <Button variant="dark" onClick={props.action}>Yes</Button>
                <Button variant="danger" onClick={props.close}>Cancel</Button>
            </Mdl.Footer>
        </Mdl>
    );
}