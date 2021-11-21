import * as React from "react"
import { StoreContext } from "../shared/context/store-context"
import Layout from "../shared/components/layout"
import { LineItem } from "../shared/components/line-item"
import { formatPrice } from "../shared/utils/format-price"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CartPage() {
  const { checkout, loading } = React.useContext(StoreContext)
  const [ cardDesc, setMessageCard ] = React.useState('')
  const [ activeDateIndex, setactiveDateIndex ] = React.useState(null)
  const [ activeTimeIndex, setactiveTimeIndex ] = React.useState(null)
  const [ dateValue, setDateValue ] = React.useState("")
  const [ dateIsActive, isDateActive ] = React.useState(false)
  const [ activeDP, isDPActive ] = React.useState(false)
  const emptyCart = checkout.lineItems.length === 0
  const handleCheckout = () => { window.open(checkout.webUrl) }
  const messageList = [
    {
      title: "Happy Birthday",
      desc: "Wishing you a very happy birthday! May all your dreams come true"
    },
    {
      title: "Anniversary",
      desc: "I’m so lucky to have you and your love. Thanks for putting up with me for another year! Happy Anniversary!"
    },
    {
      title: "Sorry",
      desc: "I know I was wrong. I hope you can forgive me.."
    },
    {
      title: "Romance",
      desc: "Every day with you is a wonderful addition to my life's journey. I love you!"
    },
    {
      title: "Get well soon",
      desc: "Thoughtful prayers are being sent your way with the hopes that you will feel better soon."
    },
    {
      title: "Sympathy",
      desc: "Accept my deepest and heartfelt condolences."
    }
  ]
  let dateVal2;

  function changeCardHandler(event) {
    setMessageCard(event.target.value)
  }

  function clickCardHandler(data) {
    setMessageCard(data)
  }

  const TODAY_GLOBAL = new Date()
  const TOMORROW_GLOBAL = new Date()
  TOMORROW_GLOBAL.setDate(TOMORROW_GLOBAL.getDate() + 1)
  const NEXT_GLOBAL = new Date()
  NEXT_GLOBAL.setDate(NEXT_GLOBAL.getDate() + 2)
  const MONTH_GLOBAL = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const DAYS_GLOBAL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  let dateTime = [
    {
      date: [
        { month: MONTH_GLOBAL[TODAY_GLOBAL.getMonth()] +" "+ TODAY_GLOBAL.getDate(), day: DAYS_GLOBAL[TODAY_GLOBAL.getDay()], year: TODAY_GLOBAL.getFullYear() },
        { month: MONTH_GLOBAL[TOMORROW_GLOBAL.getMonth()] +" "+ TOMORROW_GLOBAL.getDate(), day: DAYS_GLOBAL[TOMORROW_GLOBAL.getDay()], year: TODAY_GLOBAL.getFullYear() }
      ]
    }, 
    {
      time: [ { val: "8AM - 1PM" }, { val: "1PM - 6PM" } ]
    }
  ]

  function handleDateClick(data, i, type,) {
    setactiveDateIndex(i);
    isDateActive(true);
    if(type === 'custom') { isDPActive(true) }
    if(type === 'day') { isDPActive(false) }
    if(i === 0) { dateChanged(TODAY_GLOBAL) }
    if(i === 1) { dateChanged(TOMORROW_GLOBAL) }
  }

  function handleTimeClick(data, i) {
    setactiveTimeIndex(i);
  }

  function handleDateChange(value, e) {
    let selectedDate = {
      month: MONTH_GLOBAL[value.getMonth()] +" "+ value.getDate(), 
      day: DAYS_GLOBAL[value.getDay()],
      year: value.getFullYear()
    }
    dateChanged(value)
  }

  function dateChanged(selectedDate) {
    setDeliveryDate(selectedDate.getDate() +"/"+ (selectedDate.getMonth()+1) +"/"+ selectedDate.getFullYear())
  }

  function setDeliveryDate(selDate){
    let selDateArr = selDate.split("/");
    let newSelDate = "";
    if (parseInt(selDateArr[0]) <10){ newSelDate += "0" + selDateArr[0]}
    else { newSelDate += selDateArr[0] }
    if (parseInt(selDateArr[1]) <10){ newSelDate += "/0" + selDateArr[1] }
    else { newSelDate += "/"+ selDateArr[1] }
    newSelDate += "/" + selDateArr[2]
    setDateValue(newSelDate)
    dateVal2 = newSelDate;
    // $("input#order_date").val(newSelDate);
  }

  return (
    <Layout>
      {emptyCart ? (
        <div className="cart-empty-page">
          <div className="section shopping-cart-empty">
            <div className="container">
              <h1>Shopping cart</h1>
              <div className="content">
                <div className="icon-cart">
                  <span className="ei-shopping-basket"></span>
                </div>
                <p className="text">No placed orders yet</p>
                <div className="btn-holder">
                  <a className="btn-brand-gradient" href="#">Search a flower now!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-page">
          <div className="section shopping-cart">
            <div className="container">
              <h1>Shopping cart</h1>
              <form>
                <div className="row row-holder">
                  <div className="col-lg-6 col-holder">
                    {checkout.lineItems.map((item) => (
                      <LineItem item={item} key={item.id} />
                    ))}
                  </div>
                  <div className="col-lg-6 col-holder">
                    <p className="delivery-title">Select a delivery date and time:</p>
                    <div className="btn-holder">
                      {
                        dateTime[0].date.map((date, i) => (
                          <div className={`bubble ${activeDateIndex === i ? 'active' : null}`} key={date.day} onClick={() => {handleDateClick(date, i, 'day')}}>
                            <p className="day">{date.day}</p>
                            <p className="month">{date.month}</p>
                          </div>
                        ))
                      }
                      <div className={`bubble ${activeDateIndex === 2 ? 'active' : null}`} onClick={() => {handleDateClick(null, 2, 'custom')}}>
                        <p className="custom">Custom Date</p>
                      </div>
                    </div>
                      {
                        activeDP ? (
                          <div className="date-picker">
                            <DatePicker 
                              inline
                              onChange={(value, e) => handleDateChange(value, e)}
                              minDate={new Date()}
                            />
                          </div>
                        ) : ( null )
                      }
                      <input readOnly="" id="order_date" name="attributes[Delivery Date]" type="hidden" value={dateValue} required />
                    <div className="order__times-main">
                      {
                        dateIsActive ? (
                          <ul className="order__times-wrap">
                            { dateTime[1].time.map((time, i) => ( 
                              <li 
                                className={activeTimeIndex === i ? 'active' : null} 
                                data-value="8AM-1PM" 
                                key={time.val}
                                onClick={() => {handleTimeClick(time, i)}}>
                                  <span>{time.val}</span>
                              </li> 
                            )) }
                          </ul>
                        ) : ( null )
                      }
                      <input type="hidden" id="order_time" name="attributes[Delivery Slot]" value="" required="" />
                    </div>
                    <div className="sender-holder">
                      <p>Sender Name:</p>
                      <input type="text" />
                    </div>
                    <div className="personal-message">
                      <p>Choose your personal card message:</p>
                      <textarea placeholder="Write your message here..." value={cardDesc} onChange={event => changeCardHandler(event)}></textarea>
                      <div className="automated-messages">
                        {
                          messageList.map(data => (
                            <span key={data.title} onClick={() => { clickCardHandler(data.desc) }}>{data.title}</span>
                          ))
                        }
                      </div>
                    </div>
                    <div className="total-price">
                      {/* <p>Total: <span>P2,900.00</span></p> */}
                      {formatPrice(
                        checkout.totalPriceV2.currencyCode,
                        checkout.totalPriceV2.amount
                      )}
                    </div>
                    <div className="place-order">
                      <button 
                        className="btn-brand-gradient"
                        onClick={handleCheckout}
                        disabled={loading}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}