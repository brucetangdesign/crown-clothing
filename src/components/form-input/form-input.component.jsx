import { Group, Input, FormInputLabel } from './form-input.styles';

const FormInput = ({ label, ...otherProps} ) => {
    return(
        <Group>
            <Input {...otherProps} />
            { label && (
               /* <FormInputLabel className={`${otherProps.value.length ? 'shrink' : ''}`}>{label}</FormInputLabel>*/
                <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
            )}
        </Group>
    );
}

export default FormInput;