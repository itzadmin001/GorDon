import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../MainCon";
import Container from "../../Components/Website/Container";
import { ref, set, update } from "firebase/database";
import { db } from "../../Firebase";

function Cart() {
    const { selectPackage, PricingDetails, user, userUID, notify, deleteUserFromdataBase } = useContext(MainContext);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        // Find the selected package details based on the selected package ID
        const packageDetails = PricingDetails.find(
            (pkg) => pkg.id === selectPackage
        );
        setSelectedPackage(packageDetails);
    }, [selectPackage, PricingDetails]);


    const handleBuyNow = ({ user, userUID, selectedPackage, deleteUserFromdataBase }) => {
        setIsProcessingPayment(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessingPayment(false);
            setPaymentSuccess(true);
            const todayDate = new Date();
            const today = todayDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            const expiry = new Date(todayDate);
            expiry.setMonth(expiry.getMonth() + 3);
            const expiryDate = expiry.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            writeUserData({ user, userUID, today, expiryDate, selectedPackage, deleteUserFromdataBase })

            setTimeout(() => {
                navigate("/member");
            }, 3000);
        }, 3000);
    };


    const writeUserData = ({ user, userUID, today, expiryDate, selectedPackage, deleteUserFromdataBase }) => {
        try {
            set(ref(db, 'member/' + userUID), {
                displayName: user.displayName,
                email: user.email,
                role: "member",
                photoURL: "hi",
                packageDate: today,
                expiryDate: expiryDate,
                packageName: selectedPackage.name,
                packagePrice: selectedPackage.price,
                gender: user.gender
            }).then((success) => {
                notify("Please Wait Few mints")
                deleteUserFromdataBase("users", userUID)
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <section className=" text-white py-16">
            <Container>
                <h2 className="text-3xl font-bold text-center mb-8">
                    Your <span className="text-[#CAFF33]">Cart</span>
                </h2>

                {selectedPackage ? (
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-bold mb-4">{selectedPackage.name}</h3>
                        <p className="text-xl font-semibold text-[#CAFF33] mb-4">
                            {selectedPackage.price}
                        </p>
                        <p className="text-gray-400 mb-6">{selectedPackage.description}</p>
                        <ul className="text-gray-300 mb-6 space-y-2">
                            {selectedPackage.features.map((feature, index) => (
                                <li key={index} className="text-sm">
                                    • {feature}
                                </li>
                            ))}
                        </ul>
                        {!isProcessingPayment && !paymentSuccess && (
                            <button
                                className="bg-[#CAFF33] text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-[#c9ff3387]"
                                onClick={() => handleBuyNow({ user, userUID, selectedPackage, deleteUserFromdataBase })}
                            >
                                Buy Now
                            </button>
                        )}

                        {isProcessingPayment && (
                            <div className="mt-6">
                                <p className="text-gray-400">Processing your payment...</p>
                                <div className="loader mt-4"></div>
                            </div>
                        )}

                        {paymentSuccess && (
                            <div className="mt-6">
                                <p className="text-green-500 font-bold">
                                    Payment Successful!
                                </p>
                                <p className="text-gray-400">
                                    Redirecting you to the confirmation page...
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">
                        No package selected. Please go back and select a package.
                    </p>
                )}
            </Container>
        </section>
    );
}

export default Cart;