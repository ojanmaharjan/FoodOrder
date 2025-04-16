// const handlePayment = () => {
//     const config = {
//       publicKey: '_id', 
//       productIdentity: '1234567890', 
//       productName: 'Food Cart', 
//       productUrl: window.location.href, 
//       transactionAmount: totalAmount * 100, 
//       callbackUrl: 'http://localhost:5000/payment/success', 
//     };

//     const checkout = new window.KhaltiCheckout(config);

//     checkout.show();
//   };

// import requests
// from django.conf import settings
// from django.http import JsonResponse
// from django.views.decorators.csrf import csrf_exempt

// @csrf_exempt
// def verify_payment(request):
//     if request.method == 'POST':
//         payment_id = request.data.get('payment_id')  # Payment ID from the frontend
//         amount = request.data.get('amount')  # The amount paid

//         # Replace with your Khalti secret key
//         secret_key = settings.KHALTI_SECRET_KEY

//         # Prepare data for verification
//         data = {
//             'token': payment_id,
//             'amount': amount,
//         }

//         # Make the verification request to Khalti
//         response = requests.post(
//             'https://khalti.com/api/v2/payment/verify/',
//             data=data,
//             headers={'Authorization': f'Bearer {secret_key}'}
//         )

//         if response.status_code == 200:
//             # Payment verified successfully
//             return JsonResponse({'status': 'success'})
//         else:
//             # Payment verification failed
//             return JsonResponse({'status': 'failure'})


