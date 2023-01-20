import e from 'express';
import React from 'react';

type FormFieldType = {
    label: string,
    fieldType: 'text' | 'email' | 'password' | 'password_repeat',
}

type DataObjectType = {
    formFields: Array<FormFieldType>,
    submitBtnLabel: 'string',
}

type PropTypes = {
    dataObject: DataObjectType,
}

function FormGenerator(props: PropTypes): JSX.Element {
    const { dataObject } = props;
    const { formFields, submitBtnLabel} = dataObject;

    function onSumbit(e: React.SyntheticEvent):void {
        e.preventDefault();
        console.log('submit pressed');
    }

    return (
        <section>
            <form onSubmit={onSumbit}>
                <>
                    {formFields.map((field) => {
                        // create a components for a different fields and add logic here
                    })}
                    <button type='submit'>{submitBtnLabel}</button>
                </>
            </form>
        </section>
    )
}

export default FormGenerator;

// add some kind of error fields for validation in components
// add validation for each type of fields - some regex field in FormFieldType
