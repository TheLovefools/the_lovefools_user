import React from 'react'
import './terms&conditions.css'

const page = () => {
    return (
        <div style={{ background: '#D4BA97', minHeight: '100vh', paddingTop: '12vh' }}>
            <div style={{ padding: 15 }}>
            <h2 className='text-center' style={{ fontSize: 'large', fontWeight: 600 }}>Terms and Conditions for Table Reservations at LoveFools</h2>
            <p class="p18 text-center">Welcome to LoveFools! By making a reservation on our website, you agree to the following terms and
                conditions regarding booking and cancellations.</p>
            <br />
            <div class="info-box mb30">
                <h4 class="common-heading-h3">
                    1. Reservation and Payment
                </h4>
                <ul>
                    <li>To secure your table reservation at LoveFools, an advance payment of ₹250 per person is required.</li>
                    <li>The advance payment is deducted from your final bill during your visit.</li>
                    <li>Once the booking is confirmed, you will receive a confirmation email with the reservation details.</li>
                </ul>
            </div>
            <div class="info-box mb30">
                <h4 class="common-heading-h3">
                    2. Cancellation and Refund Policy
                </h4>
                <ul>
                    <li>Cancellations made 24 to 48 hours prior to the reservation will be eligible for a full refund of the advance
                        payment.</li>
                    <li>Cancellations made less than 24 hours before the reservation, or no-shows, will not be eligible for any
                        refund.</li>
                    <li>Refunds, if applicable, will be processed within 7 business days to the original payment method.</li>
                </ul>
            </div>
            <div class="info-box mb30">
                <h4 class="common-heading-h3">
                    3. Changes to Reservation
                </h4>
                <ul>
                    <li>Should you need to change the number of guests or modify your reservation time, please contact us at least
                        24 hours prior to your booking. We will do our best to accommodate your request, subject to availability.
                    </li>
                </ul>
            </div>
            <div class="info-box mb30">
                <h4 class="common-heading-h3">
                    4. Late Arrivals
                </h4>
                <ul>
                    <li>If you arrive more than 30 minutes late to your reservation, your table may be released, and we cannot
                        guarantee availability. In such cases, the advance payment will not be refunded.</li>
                </ul>
            </div>
            <div class="info-box mb30">
                <h4 class="common-heading-h3">
                    5. Special Requests
                </h4>
                <ul>
                    <li>Special requests (e.g., seating preferences, dietary restrictions) will be accommodated as best as possible,
                        but we cannot guarantee fulfillment. Please inform us in advance for any special requirements.</li>
                </ul>
            </div>
            <div class="info-box mb30">
                <h4 class="common-heading-h3">
                    6. Right to Refuse Service
                </h4>
                <ul>
                    <li>LoveFools reserves the right to refuse service to guests who do not adhere to our house policies, including
                        abusive behavior or disruptive conduct.</li>
                </ul>
            </div>

            <h4 class="common-heading-h3 text-center">
                <u>Thank you for choosing LoveFools! We look forward to welcoming you.</u>
            </h4>
            </div>
        </div>
    )
}

export default page