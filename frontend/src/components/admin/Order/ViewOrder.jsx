import React, { useState, useMemo } from "react";
import ViewLayout from "@/components/admin/shared/ViewLayout";
import { useGetAllOrdersQuery } from "@/redux/api/productApi";
import { orderColumns } from "@/components/admin/shared/table/columns/OrderColumns";
import OrderDetailsDialog from "./OrderDetailsDialog";

const ViewOrder = () => {
  const { data: orderData, isLoading, error } = useGetAllOrdersQuery();
  const [globalFilter, setGlobalFilter] = useState("");

  // Dialog state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle view details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  // Get columns with view handler
  const columns = useMemo(
    () => orderColumns({ onViewDetails: handleViewDetails }),
    [handleViewDetails]
  );

  // Transform data for table
  const data = useMemo(() => {
    if (!orderData?.data) return [];
    return [...orderData.data]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((order, index) => ({
        id: index + 1,
        _id: order._id,
        user: order.user,
        totalItems: order.orderItems?.length || 0,
        totalPrice: order.totalPrice,
        orderStatus: order.orderStatus,
        paymentInfo: order.paymentInfo,
        createdAt: new Date(order.createdAt).toLocaleString(),
        // Include all fields needed for the details dialog
        orderItems: order.orderItems,
        itemsPrice: order.itemsPrice,
        taxPrice: order.taxPrice,
        shippingPrice: order.shippingPrice,
        discountPrice: order.discountPrice,
        priority: order.priority,
        orderNotes: order.orderNotes,
        deliveredAt: order.deliveredAt,
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
      }));
  }, [orderData]);

  return (
    <>
      <ViewLayout
        title="Orders"
        description="Manage customer orders"
        isLoading={isLoading}
        error={error}
        data={data}
        columns={columns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <OrderDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        order={selectedOrder}
      />
    </>
  );
};

export default ViewOrder;
