import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import Master from '../components/layout/Master'
import { ChevronDoubleRightIcon } from '@heroicons/react/outline'
import Home from '.'
import { Router, useRouter } from 'next/router'
import { getMenuItems } from '../lib/api'

const delivery = [ 'Takeaway', 'Dinein', 'Delivery']
const payment = [ 'Credit', 'Cash'];

const time = new Date();
const timenow =time.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false})

//console.log(timenow);

export default function user() {



  const [deliveryType, setDeliveryType] = useState(delivery[0]);
  const [paymentType, setPaymentType] = useState(payment[0]);
  const [memberid, setMemberid] = useState('');
  const [time, setTime] = useState(timenow);
  const [err, setErr] = useState('');
  const [menucat, setMenucat] = useState('');

  const router = useRouter();


  useEffect(() => {

    
    if(menucat != ''){
      
        const first = menucat[0].name;
       router.push(`/category/${first}`)
    }
    
  });

  const getMenu =  async (e) => {

    e.preventDefault();
    //router.push('/')

    const checkoutinfo = 
        {deliveryType: deliveryType,
        paymentType: paymentType,
        memberid:memberid,
        time:time}
    ;

    localStorage.setItem('checkoutinfo', JSON.stringify(checkoutinfo));

   // document.title = localStorage.getItem(checkoutinfo.memberid);
    const menus = await getMenuItems(checkoutinfo);
    menus.cat ? localStorage.setItem('menucat', JSON.stringify(menus.cat)):null;
    menus.error ? setErr(menus.error):setErr('');
    menus.cat ? setMenucat(menus.cat):setMenucat('');

    
  }

 

  return (
      <Master>

	 
<form onSubmit={getMenu}>
    <div className='px-4 py-2'>
        <input  type="search"  id="default-search" onChange={e => setMemberid(e.target.value)} value={memberid} className="block p-4 py-3 pl-4 w-full text-md text-gray-100 bg-c5 rounded-lg border border-c5 placeholder-c6::placeholder	 focus:ring-purple-500 focus:border-purple-500 place" placeholder="Member ID" required />
        {err != '' ? <i className='text-white text-sm pl-2'>Invalid MemberID</i>:null}
    </div>


    <div className="text-1xl font-300 text-c3 px-4 pt-4">Delivery Time</div>
    <div className="flex justify-center p-4">
        <input 
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
        className="block w-full p-4 py-3 pl-4 w-full text-md text-gray-100 bg-c5 rounded-lg border border-c5 placeholder-c6::placeholder	 focus:ring-purple-500 focus:border-purple-500 place focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none"
            data-mdb-toggle="input-toggle-timepicker" 
            min={time} max="24:59" required
              />
    </div>




	<div className="text-1xl font-300 text-c3 px-4 pt-4">Delivery Type</div>
      <div className="mx-auto w-full max-w-md p-4 py-2">
        <RadioGroup value={deliveryType} onChange={setDeliveryType}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className=" flex">
            {delivery.map((plan) => (
              <RadioGroup.Option
                key={plan}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked ? 'bg-purple-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-4 py-3 shadow-md focus:outline-none w-1/3 mr-2`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan}
                          </RadioGroup.Label>
                           
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
 

	<div className="text-1xl font-300 text-c3 p-4 pb-0">Payment Type</div>

    <div className="mx-auto w-full max-w-md p-4 py-2">
        <RadioGroup value={paymentType} onChange={setPaymentType}>
       
          <div className=" flex">
            {payment.map((plan) => (
              <RadioGroup.Option
                key={plan}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked ? 'bg-purple-900 bg-opacity-75 text-white  w-full' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-3 shadow-md focus:outline-none  w-1/2 mr-2`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan}
                          </RadioGroup.Label>
                           
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className='p-4 fixed bottom-3 w-full'>

      <button type="submit" className="inline-block py-4 bg-purple-600 text-white font-medium text-md leading-tight uppercase rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-full flex align-middle text-center justify-center">
          <span>Choose Menu</span>
          <ChevronDoubleRightIcon className='w-7 pl-2' />
          </button>



      </div>


      

	


    
      </form>
    
    </Master>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
