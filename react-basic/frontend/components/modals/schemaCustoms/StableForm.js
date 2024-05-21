//import React from 'react';
import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { _ } from './../../../util';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
const Form = withTheme(MuiTheme);

const Nop = (props) => '';
const fields = { TitleField: Nop };
// Some links about look customization:
// https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/#error-list-template
// https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/#custom-field-components
// https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/#custom-widget-components

const StableForm = ({schema, onChange, onValid, onError, initialData, ...props}) => {
    const btn = useRef(); // hack, see comment in <Form>
    const [data, setData] = useState(initialData);
    let justRendered = true;
    const forceValidate = _.debounce(20, () => btn.current.click());

    const formProps = {
        onChange: (newData) => { // Either it's a first render, or re-render after saving the data
            if (justRendered && !data) {
                justRendered = false;
                return;
            }
            setData(newData.formData); // save it because onChange may trigger redraw and lose it
            forceValidate();
            onChange(newData.formData);
        },
        onError,
        onSubmit: (data) => {
            onValid(data.formData);
        },
        schema,
        formData: data,
        showErrorList: false,
        fields,
        ...props,
    };
    return (
          <Form {...formProps} >
            {/*
                Despite what the docs https://react-jsonschema-form.readthedocs.io/en/latest/#submit-form-programmatically say,
                ref object just doesn't have .submit method. Maybe this is due to interplay with rjsf-material-ui
                So, submitting through controlled invisible button is what we'll do.
                Note that just using Hidden doesn't work - we need the button to be rendered, but not displayed.
            */}
                <Button ref={btn} type='submit' style={{display:'none'}}> </Button>
        </Form>
    );
};

export default StableForm;
