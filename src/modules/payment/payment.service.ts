import { prisma } from '../../lib/prisma.js';
import { sslcz } from '../../config/sslcommerz.js';

export const createPayment = async (
  userId: string,
  data: { bookingId: string }
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: data.bookingId },
    include: { service: true, customer: true },
  });
  if (!booking) throw new Error('Booking not found');
  if (booking.customerId !== userId) throw new Error('Not authorized for this booking');
  if (booking.status !== 'ACCEPTED') throw new Error('Booking must be ACCEPTED before payment');

  const existingPayment = await prisma.payment.findUnique({ where: { bookingId: data.bookingId } });
  if (existingPayment) throw new Error('Payment already exists for this booking');

  const transactionId = `FIXITNOW_${booking.id}_${Date.now()}`;

  const payment = await prisma.payment.create({
    data: {
      bookingId: data.bookingId,
      userId,
      amount: booking.service.price,
      provider: 'SSLCOMMERZ',
      status: 'PENDING',
      transactionId,
    },
  });

  const sslData = {
    total_amount: booking.service.price,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: `${process.env.APP_URL}/api/payments/confirm?status=success&tran_id=${transactionId}&bookingId=${booking.id}`,
    fail_url: `${process.env.APP_URL}/api/payments/confirm?status=fail&tran_id=${transactionId}&bookingId=${booking.id}`,
    cancel_url: `${process.env.APP_URL}/api/payments/confirm?status=cancel&tran_id=${transactionId}&bookingId=${booking.id}`,
    ipn_url: `${process.env.APP_URL}/api/payments/confirm`,
    shipping_method: 'No',
    product_name: booking.service.title,
    product_category: 'Home Service',
    product_profile: 'service',
    cus_name: booking.customer.name,
    cus_email: booking.customer.email,
    cus_add1: 'N/A',
    cus_city: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01700000000',
    ship_name: booking.customer.name,
    ship_add1: 'N/A',
    ship_city: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const apiResponse = await sslcz.init(sslData);

  return { payment, gatewayUrl: apiResponse.GatewayPageURL };
};

export const confirmPayment = async (bookingId: string, transactionId: string, success: boolean) => {
  const payment = await prisma.payment.findUnique({ where: { bookingId } });
  if (!payment) throw new Error('Payment not found');

  const updatedPayment = await prisma.payment.update({
    where: { bookingId },
    data: {
      status: success ? 'COMPLETED' : 'FAILED',
      paidAt: success ? new Date() : null,
    },
  });

  if (success) {
    await prisma.booking.update({ where: { id: bookingId }, data: { status: 'PAID' } });
  }

  return updatedPayment;
};

export const getUserPayments = async (userId: string) => {
  return prisma.payment.findMany({
    where: { userId },
    include: { booking: { include: { service: true } } },
    orderBy: { createdAt: 'desc' },
  });
};

export const getPaymentById = async (paymentId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { booking: { include: { service: true } } },
  });
  if (!payment) throw new Error('Payment not found');
  return payment;
};