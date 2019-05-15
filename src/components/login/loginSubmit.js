import React from 'react';
import classnames from 'classnames';
import { Button, Form } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

const LoginSubmit = ({ className, ...rest }) => {
    const clsString = classnames(styles.submit, className);
    return (
        <FormItem>
            <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest}></Button>
        </FormItem>
    )
}

export default LoginSubmit;
