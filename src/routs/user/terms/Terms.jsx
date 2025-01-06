import React from 'react';
import { background } from '../../../constans/background';

import './terms.css'
const Terms = () => {
    return (
        <>
            <section class="termsSection my-3">
                <div class="container">
                    <h1 class="text-center roboto sectHead text-capitalize text-dark pt-5 pageHeader">
                        Terms &amp; Conditions
                    </h1>
                    <div class="separetor mx-auto my-5 bg-dark"></div>
                    <p class="py-3">
                        Welcome to Coral, your destination for high-quality garments and fashion. By accessing and
                        using our
                        website, you agree to comply with and be bound by the following Terms and Conditions. These
                        terms
                        govern
                        the use of our
                        website, the purchasing of products, and our relationship with you as a customer. Please
                        read
                        through
                        these Terms
                        carefully before making any purchases. If you do not agree with any part of these terms,
                        please
                        refrain
                        from using our
                        services.
                    </p>
                    <div class="row termsBck rounded reverse">
                        <div class="col-12 col-lg-9 my-4">
                            <div class="termsBox">

                                <div class="fs-3 fw-bold text-dark my-2">
                                    Return and Refund Policy
                                </div>
                                <div>
                                    <ul class="list-unstyled">
                                        <li class="d-flex align-items-center">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            Customers cannot return items after receiving the product unless the item is damaged
                                            or
                                            defective upon arrival.
                                        </li>
                                        <li class="d-flex align-items-center">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            To initiate a return or exchange, customers must contact us within [number of days]
                                            of
                                            receiving the product.
                                        </li>
                                        <li class="d-flex align-items-center">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            All returns must be in the original, unworn condition with all tags and packaging
                                            intact.
                                        </li>
                                    </ul>
                                </div>

                                <div class="fs-3 fw-bold text-dark my-2">
                                    Product Information and Quality
                                </div>
                                <div>
                                    <ul class="list-unstyled">
                                        <li class="d-flex align-items-center">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            All products listed on our website are either handmade or premium branded garments,
                                            ensuring
                                            high-quality materials and
                                            craftsmanship.
                                        </li>
                                        <li class="d-flex align-items-center">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            We strive to provide accurate product descriptions, but colors and sizes may vary
                                            slightly
                                            due to lighting or screen
                                            settings.
                                        </li>
                                    </ul>
                                </div>

                                <div class="fs-3 fw-bold text-dark my-2">
                                    Order Processing and Shipping
                                </div>
                                <div>
                                    <ul class="list-unstyled">
                                        <li class="d-flex align-items-center">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            Orders will be processed within [insert number] business days after receiving
                                            payment.
                                        </li>
                                        <li class="d-flex align-items-center">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            Shipping fees and delivery times will vary depending on the destination. Customers
                                            will
                                            receive a tracking number once
                                            the order is dispatched.
                                        </li>
                                        <li>
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            We are not responsible for delays caused by third-party carriers or customs issues.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-3 my-4">
                            <div class="terms-Pic">
                                <img src={background.terms2} alt="" class="" />
                            </div>
                        </div>
                    </div>
                    <div class="row my-3 rounded">
                        <div class="col-12">
                            <div class="termsBox termsBoxBack">

                                <div class="fs-3 fw-bold my-2 text-white">
                                    Payment and Pricing
                                </div>
                                <div>
                                    <ul class="list-unstyled text-white">
                                        <li class="d-flex align-items-center text-white">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            All prices listed on our website are in [currency] and may change without prior
                                            notice.
                                        </li>
                                        <li class="d-flex align-items-center text-white">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            Customers are responsible for any applicable taxes or customs duties for
                                            international orders.
                                        </li>
                                    </ul>
                                </div>

                                <div class="fs-3 fw-bold  text-white my-2">
                                    Customer Responsibility
                                </div>
                                <div>
                                    <ul class="list-unstyled">
                                        <li class="d-flex align-items-center text-white">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            Customers are responsible for providing accurate shipping information. We are not
                                            liable for lost or undelivered orders
                                            due to incorrect addresses.
                                        </li>
                                        <li class="d-flex align-items-center text-white">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            We strive to provide accurate product descriptions, but colors and sizes may vary
                                            slightly
                                            due to lighting or screen
                                            settings.
                                        </li>
                                    </ul>
                                </div>

                                <div class="fs-3 fw-bold text-white my-2">
                                    Product Availability
                                </div>
                                <div>
                                    <ul class="list-unstyled">
                                        <li class="d-flex align-items-center text-white">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            While we strive to keep our stock updated, items may occasionally be out of stock.
                                            If an item is unavailable, customers
                                            will be notified promptly, and an alternative or refund will be offered.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-3 termsBck rounded">
                        <div class="col-12 col-lg-9 my-4">
                            <div class="termsBox">

                                <div class="fs-3 fw-bold text-black my-2">
                                    Privacy and Data Protection
                                </div>
                                <div>
                                    <ul class="list-unstyled">
                                        <li class="d-flex align-items-center text-black">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            We are committed to protecting your privacy and personal data. All personal
                                            information provided during purchase will be
                                            kept confidential and used only for processing your order.

                                        </li>
                                        <li class="d-flex align-items-center text-black">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            By using our website, you consent to our privacy policy and the collection of
                                            necessary data to complete your purchase.
                                        </li>
                                    </ul>
                                </div>

                                <div class="fs-3 fw-bold text-black my-2">
                                    Intellectual Property
                                </div>
                                <div>
                                    <ul class="list-unstyled">
                                        <li class="d-flex align-items-center text-black">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            All content on the website, including images, text, and logos, is the intellectual
                                            property of CORAL and
                                            is protected by copyright laws.
                                        </li>
                                        <li class="d-flex align-items-center text-black">
                                            <i class="fa-regular fa-hand-point-right me-2 "></i>
                                            Unauthorized use or reproduction of our content is strictly prohibited.
                                        </li>
                                    </ul>
                                </div>

                                <div class="fs-3 fw-bold text-black my-2">
                                    Limitation of Liability
                                </div>
                                <div>
                                    <ul class="list-unstyled">
                                        <li class="d-flex align-items-center text-black">
                                            <i class="fa-regular fa-hand-point-right me-2 text-black"></i>
                                            We will not be held liable for any damages or loss resulting from the use of our
                                            products, website, or
                                            services.
                                        </li>
                                        <li class="d-flex align-items-center text-black">
                                            <i class=" fa-regular fa-hand-point-right me-2 text-black"></i>
                                            We are not responsible for any indirect, incidental, or consequential damages that
                                            may arise from your purchase or use
                                            of the products.

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-3 my-4">
                            <div class="terms-Pic">
                                <img src={background.mrd} alt="" class="" />
                            </div>
                        </div>
                    </div>
                    <div class="row my-3 termsBck rounded">
                        <div class="col-12 termsBox">
                            <div class="fs-3 fw-bold text-black my-2">
                                Amendments to Terms and Conditions
                            </div>
                            <div>
                                <ul class="list-unstyled">
                                    <li class="d-flex align-items-center text-black">
                                        <i class="fa-regular fa-hand-point-right text-black me-2 "></i>
                                        We reserve the right to update or modify these terms at any time. Changes will be
                                        reflected
                                        on this page, and it is the
                                        customer's responsibility to review the terms periodically.
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Terms
