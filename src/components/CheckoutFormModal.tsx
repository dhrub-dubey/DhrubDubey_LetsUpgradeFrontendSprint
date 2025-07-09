import React, { useState } from 'react';

interface CheckoutFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: {
        name: string;
        quantity: number;
    }[];
}

const CheckoutFormModal: React.FC<CheckoutFormModalProps> = ({ isOpen, onClose, cartItems }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        let message = `Hi, I'd like to place an order for:\n`;
        cartItems.forEach((item) => {
            message += `- ${item.name} x${item.quantity}\n`;
        });

        // Format the date to DD-MM-YYYY
        const [yyyy, mm, dd] = date.split('-');
        const formattedDate = `${dd}-${mm}-${yyyy}`;
        message += `\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nNeeded By: ${formattedDate}`;


        const phoneNumber = '+917439266471'; // Replace with business number
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-4">
                <h2 className="text-xl font-serif text-[#C71585]">Enter Your Details</h2>

                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#C71585]"
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#C71585]"
                />

                <textarea
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#C71585]"
                />

                <div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#C71585]"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Please enter the date in the above field by which you need the order.
                    </p>
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 rounded bg-[#C71585] text-white hover:bg-[#C71585]/90"
                    >
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutFormModal;
