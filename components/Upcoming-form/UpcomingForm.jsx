'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ControllerTextField from '@/components/common/ControllerTextField';
import Button from '@/components/common/Button';
import FormProvider from '@/components/common/FormProvider';
import ControllerTextArea from '../common/ControllerTextArea';
import ControllerDatePicker from '../common/ControllerDatePicker';
import ControllerDateTimePicker from '../common/ControllerDateTimePicker';
import { upcomingEventSchema } from '@/schema/UpcomingEventSchema';
import { Divider } from '@mui/material';
import ControllerSelect from '../common/ControllerSelect';
import { generateOptions } from "@/utils/utils";
import { enquiryFor } from '@/utils/constant';

const UpcomingEventForm = ({handleUpcomingEventSubmit, handleClose, defaultValues }) => {

  // const eventOptions = [
  //   { value: 'bigevent', label: 'Big Event' },
  //   { value: 'gettogether', label: 'Get Together' },
  //   { value: 'party', label: 'Party' },
  //   { value: 'other', label: 'Other' }
  // ]

  const methods = useForm({
    resolver: yupResolver(upcomingEventSchema),
    defaultValues,
    mode: 'onBlur',
  });
  
  const {handleSubmit, formState: { isSubmitting, errors }} = methods;

  console.log("form errors_", errors);  

  const onSubmit = async (data) => {
    console.log("UpcomingEventForm data_", data, errors);
    handleUpcomingEventSubmit(data);
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}>
      <div >
        <div className='grid grid-cols-2 gap-4 upcoming-form'>
          <div className='upcoming-form-field upcoming-form-date'>
            <ControllerDatePicker
              type='text'
              name='event_date'
              label='Event Date'
              color='#000 !important'
              isDisabled={defaultValues.date}
            />
          </div>
          <div className='upcoming-form-field upcoming-form-time'>
            <ControllerDateTimePicker
              name='event_time'
              label='Event Time'
              width='w-full'
            />
          </div>
          <div className='upcoming-form-field upcoming-form-name col-span-2'>
            <ControllerTextField
              type='text'
              placeholder='Enter Event Name.'
              name='event_name'
              label='Event Name'
            />
          </div>
          <div className='upcoming-form-field upcoming-form-mobile col-span-2'>
            <ControllerTextField
              type='text'
              placeholder='Enter Mobile No.'
              name='event_mobile'
              label='Mobile No.'
            />
          </div>
          <div className='upcoming-form-field upcoming-form-email col-span-2'>
            <ControllerTextField
              type='text'
              placeholder='Enter Email'
              name='event_email'
              label='Email'
            />
          </div>
          <div className='upcoming-form-field upcoming-form-dd col-span-2'>
            <ControllerSelect
              options={generateOptions(enquiryFor, 'value', 'type')}
              // options={eventOptions}
              placeholder='Enquiry For'
              name='event_enquiry_option'
              label='Enquiry For'
            />
          </div>
          <div className='upcoming-form-field upcoming-form-message col-span-2'>
            <ControllerTextArea
              type='text'
              placeholder='Message'
              name='event_description'
              label='Message'
              rows={8}
            />
          </div>
          <Divider className='upcoming-form-divider col-span-2'/>
          <div className='space-x-4 space-y-2 col-span-2 mb-3 mt-3'>
            {/* <Button
             className='btn-secondary'
              type='button'
              onClick={handleClose}>
              Cancel
            </Button> */}
            <Button type='submit' className='w-full' style={{width: '100%'}}>{defaultValues.id ? 'Update' : 'Send'}</Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default UpcomingEventForm;
