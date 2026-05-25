'use client'

import { useState } from 'react'
import { createCheckoutSession } from '@/lib/api'

export default function PaymentButton() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handlePayment = async () => {
        setLoading(true)
        setError(null)

        const { data, error: apiError } = await createCheckoutSession()

        if (apiError) {
            setError(apiError)
            setLoading(false)
            return
        }

        if (data && (data.url || data.checkout_url)) {
            window.location.href = data.url || data.checkout_url
        } else {
            setLoading(false)
            console.warn('Checkout session creada pero no se retornó una URL de Stripe:', data)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={handlePayment}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
            >
                {loading ? 'Procesando...' : 'Pagar con Stripe'}
            </button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
    )
}
