import React from 'react'

import { Button, Form, Input, Select } from 'antd';
import FormBuilder from '../../../../components/FormBuilder.js';
import download from '../../../../utils/download.js';

const Option = Select.Option;
 function QueryForm(props) {

  const { tagList, categoryList, form } = props;

  const formMeta = {
    colon: true,
    elements: [
      {
        key: 'keyword',
        label: '关键字',
        widget: <Input placeholder='请输入关键字' allowClear />
      },
      {
        key: 'tag',
        label: '标签',
        widget: (
          <Select className='form-select' allowClear>
            {
              tagList.map(item => (
                <Option key={item.name} value={item.name}>
                  { item.name }
                </Option>
              ))
            }
          </Select>
        ),
        validateTrigger:'onBlur',
        rules: [{ required: false }],
      },
      {
        key: 'category',
        label: '分类',
        widget: (
          <Select className='form-select' allowClear>
            {categoryList.map(item => (
              <Option key={item.name} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        ),
        validateTrigger:'onBlur',
        rules: [{ required: false }],
      }
    ]
  }

  function handleSubmit (e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) return ;
      const params = {};
      Object.keys(values).forEach(key => {
        if (values[key]) {
          params[key] = values[key];
        }
      });
      props.onQuery(params);
    });
  }

  function outputAll() {
    download('/article/output/all');
  }

  return (
    <div className='query-form'>
      <Form layout='inline' onSubmit={handleSubmit}>
        <FormBuilder meta={formMeta} form={form}>
          {
            [
              <Button type='primary' htmlType='submit' key={1}>
                搜索
              </Button>,
              <Button type='primary' onClick={outputAll} key={2}>
                导出
              </Button>
            ]
          }
        </FormBuilder>

      </Form>
    </div>
  )
}

export default Form.create()(QueryForm);