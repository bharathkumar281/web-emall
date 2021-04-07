
import { Button as Btn } from 'react-bootstrap';
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
             disabled={props.disabled}>
            {props.children}
        </Btn>
    );
}