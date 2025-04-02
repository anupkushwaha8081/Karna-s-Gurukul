// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { captureAndFinalizePaymentService } from "@/services/services";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// function PaypalPaymentReturnPage() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const paymentId = params.get("paymentId");
//   const payerId = params.get("PayerID");

//   useEffect(() => {
//     if (paymentId && payerId) {
//       async function capturePayment() {
//         const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

//         const response = await captureAndFinalizePaymentService(
//           paymentId,
//           payerId,
//           orderId
//         );

//         if (response?.success) {
//           sessionStorage.removeItem("currentOrderId");
//           window.location.href = "/student-courses";
//           toast.success("Course purchase successfully !", { position: "bottom-right" });

//         }
//       }

//       capturePayment();
//     }
//   }, [payerId, paymentId]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Processing payment... Please wait</CardTitle>
//       </CardHeader>
//     </Card>
//   );
// }

// export default PaypalPaymentReturnPage;

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services/services";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function PaypalPaymentReturnPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

        const response = await captureAndFinalizePaymentService(
          paymentId,
          payerId,
          orderId
        );

        if (response?.success) {
          sessionStorage.removeItem("currentOrderId");
          toast.success("Course purchased successfully!", { position: "bottom-right" });

          // Wait for the toast to show before redirecting
          setTimeout(() => {
            window.location.href = "/student-courses";
          }, 1500); // 1.5-second delay
        }
      }

      capturePayment();
    }
  }, [payerId, paymentId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment... Please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalPaymentReturnPage;
