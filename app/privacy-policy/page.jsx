import React from 'react'
import './privacy-policy.css'

const page = () => {
    return (
        <div style={{ background: '#D4BA97', minHeight: '85vh', paddingTop: '10vh' }}>
            <div className='tc-section common-section'>
                <div className="tc-inner-card">
                    <h2 className='text-center common-heading-h2'><small>Privacy Policy for Table Reservations at LoveFools</small></h2>
                    <p className="p18 text-center" style={{ fontSize: "18px" }}>Welcome to LoveFools! By making a reservation on our website, you agree to the following Privacy Policy regarding booking and cancellations.</p>
                    <br />
                    <div class="info-box mb30">
                        <h4 class="common-heading-h3">
                            1. Privacy and Data Usage
                        </h4>
                        <ul>
                            <li>By booking a table, you consent to the collection of your personal information solely for the purpose of confirming
                                and managing your reservation. We value your privacy and do not share your information with third parties.</li>
                        </ul>
                    </div>
                    <div class="info-box mb30">
                        <h4 class="common-heading-h3">
                            2. Liability
                        </h4>
                        <ul>
                            <li>LoveFools is not liable for any loss, damage, or injury sustained by guests while on the premises, except where caused
                                by the negligence of the restaurant.</li>
                        </ul>
                    </div>

                    <h4 class="common-heading-h3 text-center">
                        <u>Thank you for choosing LoveFools! We look forward to welcoming you.</u>
                    </h4>
                </div>

            </div>
        </div>
    )
}

export default page