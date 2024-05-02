import home from '../../styles/Mortgage/Home.module.css'
import styles from '../../styles/Mortgage/Calculator.module.css'
import content from '../../styles/Mortgage/Content.module.css'
import result from '../../styles/Mortgage/Result.module.css'
import company from '../../styles/Mortgage/CompanyResult.module.css'
import Image from "next/image"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import React from "react";





// const router = useRouter()



const Mortgage = () => {
    const router = useRouter()
    const data = router.query
    const [option, setOption] = useState(data.type)

    // const handleBroker = 

    useEffect(() => {
        setOption(data.type)
    }, )

    useEffect(() => {
        if(option === "result") {
        // get the element by id and use scrollIntoView
            const elem = document.getElementById('here');
            elem?.scrollIntoView({
            behavior: "smooth",
            });
        }
    },[option] )


    
    return (
        <div 
         className={`${option}` === 'broker result' ? `${home.container_two}` : `${home.container}`}>
            <Image 
             className={`${option}` ==='calculator'|| `${option}` === 'result' ? `${home.img_one}` : `${home.img_two}`} 
             src='/images/mortgage-back-drop_mobile.png' 
             width={300} 
             height={300} 
             alt='image'
            />
            {option ==='calculator'|| option === 'result' ? <Calculator/> : null}
            {option === 'broker' && <Input/>}
            {option === "calculator" && <Content/>}
            {option === "result" && <Result/>}
            {option === 'broker' &&<FindBroker/>}
            {option === 'broker result' && <MortgagesResult/>}

        </div>
    )
}


const Calculator = () => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        deposit: '',
        annualIncome: '',
        duration: '',
        interest: ''
    })

    // Condiiton to disable and enable button 
    const validate = () => {
        return formData.deposit.length && formData.annualIncome.length && formData.duration && formData.interest
    };

    const handleChange = (event) => {
        setFormData({ ...formData,[event.target.name]: event.target.value});
    }


    return (
        <div className={styles.container}>    
            <div>
                <span>£</span>
                <label>Deposit</label>
                <input 
                 type="number"
                 name='deposit'
                 value={formData.deposit}
                 onChange={handleChange}
                />
            </div>
            
            <div>
                <span>£</span>
                <label>Annual Income</label>
                <input 
                 type="number"
                 name='annualIncome'
                 value={formData.annualIncome}
                 onChange={handleChange}
                />
            </div>


            <section>
                <label>Duration (years)</label>
                <select
                 name="duration"
                 value={formData.duration}
                 onChange={handleChange}
                >
                    <option value="15" className='disabled'>15</option>
                    <option value="20" className='disabled'>20</option>
                    <option value="25" className='disabled' >25</option>
                    <option value="30" className='disabled'>30</option>
                    <option value="35" className='disabled' >35</option>
                    <option value="40" className='disabled'>40</option>
                    {/* <option value="" className='disabled'>This area only</option> */}
                </select>
            </section>
            
            <section>
                <label>Intearest rate</label>
                <div>
                    <input 
                    //  placeholder="5" 
                     type="number"
                     name='interest'
                     value={formData.interest}
                     onChange={handleChange}
                    />
                    
                    {/* <span>%</span> */}
                </div>
            </section>
            <button 
             onClick={() => router.push('/mortgages?type=result')} 
             id='here'
             disabled={!validate()}
            >Calculate</button>
        </div>
    )
}


const Content = () => {
    const router = useRouter()
    return (
        <div className={content.container}>
            <section>
                <Image src='/images/rectangle-559.png' width={300} height={300} alt='image'/>
                <h2>
                    Navigating Mortgages and Finding Your Home
                </h2>
                <p>
                    Discover the key to financial happiness and ease with our expert guidance on mortgages and finding your dream home. Make your next move the nutlip
                </p>
                <button onClick={() => router.push('/mortgages?type=broker')}>Find broker</button>
            </section>

            <section>
                <Image src='/images/rectangle-558.png' width={300} height={300} alt='image'/>
                <h2>What is a Mortgage in Principle?</h2>
                <p>
                    A Mortgage in Principle is the next step that can make a big difference when it comes to searching, viewing, and offering on a home. Also called an Agreement or Decision in Principle, or even AIP, DIP, MIP, or MAIP, you can do it online in just 30 minutes. And then {"you'll"} know how much you can borrow, safe in the knowledge that a lender has checked what 
                    <Link href='#'>
                        Read more...
                    </Link>
                </p>
            </section>
        </div>
    )
}


const Result = () => {

    return (
        <div className={result.container} >
            <article >
                <div>
                    <Image src='/images/coins.svg' width={30} height={30} alt='thumbnail'/>
                    <p>The largest mortgage loan {"you're"} likely to be offered is</p>
                </div>
                <h3>£350,000</h3>
            </article>

            <article>
                <div>
                    <Image src='/images/house.svg' width={30} height={30} alt='thumbnail'/>
                    <p>Add deposit and you could buy a home worth up to </p>
                </div>
                <h3>£200,000</h3>
            </article>

            <article>
                <div>
                    <Image src='/images/calendar.svg' width={30} height={30} alt='thumbnail'/>
                    <p>Your monthly repayment would be around</p>
                </div>
                <h3>£1,143/m</h3>
            </article>

            <Link href='/mortgages?type=broker'>
                <h3>Find a Mortgage Broker</h3>
                <p>Get to network with mortgage brokers and request for a aloan</p>
            </Link>

            <article>
                <h3>How we got this result</h3>
                <p>
                    This amount is determined by the size of your deposit. Lenders usually need you to provide a deposit of at least 10% of the property value, then {"they'll"} lend you the balance of up to 90%. This is called loan-to-value. Generally, this {"doesn't"} change, even if 4.5 times your annual income gives you a bigger amount.
                </p>
            </article>

            <Link href='/buy'>
                <h3>Find Property within budget</h3>
                <p>Add deposit and you could buy a home worth up to</p>
            </Link>

            
        </div>
    )
}


const Input = () => {
    const router = useRouter()
    return (
        <div className={styles.container_two}>
            <div>
                <input type="text" placeholder='Postcode, City, Town'/>
            </div>
            <div>
                {/* <input list='radius' placeholder='Radius'/> */}
                <select
                 name="duration"
                //  value={formData.duration}
                //  onChange={handleChange}
                >
                    <option value="" className='disabled' disabled selected defaultValue={'This area only'} >This area only</option>
                    <option value="0.25 miles" className='disabled'>0.25 miles</option>
                    <option value="0.5 miles" className='disabled' >0.5 miles</option>
                    <option value="1 mile" className='disabled'>1 mile</option>
                    <option value="3 miles" className='disabled' >3 miles</option>
                    <option value="5 miles" className='disabled'>5 miles</option>
                    {/* <option value="" className='disabled'>This area only</option> */}
                </select>
            </div>
            
            <button onClick={() => router.push('/mortgages?type=broker+result')} id='here'>Search</button>
        </div>
    )
}


const FindBroker = () => {
    return (
        <div className={content.container_two}>
            <article>
                <h3>Find a mortgage broker</h3>
                <p>It is a long established fact that a reader will be distracted by </p>
            </article>
            <section>
                <Image src='/images/question-answer.svg' width={50} height={50} alt='thumbnail'/>
                <h3>Answer a few questions </h3>
                <p>
                    Tell us a little about your loan needs and the home you want to buy or refinance 
                </p>
            </section>

            <section>
                <Image src='/images/database.svg' width={50} height={50} alt='thumbnail'/>
                <h3>Get data driven results</h3>
                <p>
                    Tell us a little about your loan needs and the home you want to buy or refinance 
                </p>
            </section>

            <section>
                <Image src='/images/phone-in-talk.svg' width={50} height={50} alt='thumbnail'/>
                <h3>Talk to a broker</h3>
                <p>
                    Tell us a little about your loan needs and the home you want to buy or refinance 
                </p>
            </section>

            <article>
                <Image src='/images/rectangle-558-1.png' width={320} height={353} alt='image'/>
                <h3>How to find the best mortgage broker</h3>
                <p>
                    The best lender for you will provide the type of loan {"you're"} looking for, whether <span>purchase loan</span>, <span>refinance loan</span> or <span>HELOC</span>, and {"they'll"} offer 
                </p>
                <ul>
                    <li>Strengthen your financial profile before contacting a mortgage lender</li>
                    <li>Improve the terms of your mortgage by shopping and comparing several lenders, local and national</li>
                </ul>
            </article>

        </div>
    )
}


const MortgagesResult = () => {
    return (
        <div className={company.container}>
            <div>
                <input type='text' placeholder='Postcode, City, Town'/>
                <select
                    name=""
                >
                    <option value="" className='disabled' disabled selected defaultValue={'Radius'} >Radius</option>
                    <option value="0.25 miles" className='disabled'>0.25 miles</option>
                    <option value="0.5 miles" className='disabled' >0.5 miles</option>
                    <option value="1 mile" className='disabled'>1 mile</option>
                    <option value="3 miles" className='disabled' >3 miles</option>
                    <option value="5 miles" className='disabled'>5 miles</option>
                    {/* <option value="" className='disabled'>This area only</option> */}
                </select>
                <button>
                    <Image src='/tabler_search.svg' width={30} height={25} alt='image'/>
                </button>
            </div>
            <article>
                <Image src='/images/image-1.png' width={200} height={70} alt='company logo'/>
                <hr/>
                <p>£1,307 (Flat fee)</p>
                <hr/>
                <div>
                    <Image src='/images/vector.svg' width={20} height={20} alt='image'/>
                    <Image src='/images/ic-baseline-whatsapp.svg' width={20} height={20} alt='image'/>
                    <Image src='/images/vuesax-linear-vuesax-linear-sms-2.svg' width={20} height={20} alt='image'/>
                </div>
            </article>

            <article>
                <Image src='/images/image-2.png' width={200} height={70} alt='company logo'/>
                <hr/>
                <p>£1,307</p>
                <hr/>
                <div>
                    <Image src='/images/vector.svg' width={20} height={20} alt='image'/>
                    <Image src='/images/ic-baseline-whatsapp.svg' width={20} height={20} alt='image'/>
                    <Image src='/images/vuesax-linear-vuesax-linear-sms-2.svg' width={20} height={20} alt='image'/>
                </div>
            </article>

            <article>
                <Image src='/images/image-3.png' width={200} height={70} alt='company logo'/>
                <hr/>
                <p>£2,000 (Flat fee)</p>
                <hr/>
                <div>
                    <Image src='/images/vector.svg' width={20} height={20} alt='image'/>
                    <Image src='/images/ic-baseline-whatsapp.svg' width={20} height={20} alt='image'/>
                    <Image src='/images/vuesax-linear-vuesax-linear-sms-2.svg' width={20} height={20} alt='image'/>
                </div>
            </article>
            <article>
                <Image src='/images/image-4.png' width={200} height={70} alt='company logo'/>
                <hr/>
                <p>£1,800 (Flat fee)</p>
                <hr/>
                <div>
                    <Image src='/images/vector.svg' width={20} height={20} alt='image'/>
                    <Image src='/images/ic-baseline-whatsapp.svg' width={20} height={20} alt='image'/>
                    <Image src='/images/vuesax-linear-vuesax-linear-sms-2.svg' width={20} height={20} alt='image'/>
                </div>
            </article>
        </div>
    )
}



export default Mortgage