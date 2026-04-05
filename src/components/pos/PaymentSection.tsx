import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Customer } from "./types";

interface PaymentSectionProps {
  customers: Customer[] | undefined;
  selectedCustomer: string;
  onCustomerChange: (customerId: string) => void;
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  total: number;
  cartEmpty: boolean;
  isProcessing: boolean;
  onCompleteSale: () => void;
}

export function PaymentSection({
  customers,
  selectedCustomer,
  onCustomerChange,
  paymentMethod,
  onPaymentMethodChange,
  total,
  cartEmpty,
  isProcessing,
  onCompleteSale,
}: PaymentSectionProps) {
  return (
    <div className="space-y-3 lg:space-y-4 pt-4 border-t border-border">
      <div>
        <label className="block text-xs lg:text-sm font-medium mb-2 text-foreground">
          কাস্টমার (ঐচ্ছিক)
        </label>
        <Select value={selectedCustomer} onValueChange={onCustomerChange}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="কাস্টমার নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {customers?.map((customer) => (
              <SelectItem key={customer.id} value={customer.id}>
                {customer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-xs lg:text-sm font-medium mb-2 text-foreground">
          পেমেন্ট পদ্ধতি
        </label>
        <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">💵 নগদ</SelectItem>
            <SelectItem value="card">💳 কার্ড</SelectItem>
            <SelectItem value="mobile">📱 মোবাইল</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-primary/10 p-3 lg:p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-base lg:text-lg font-semibold text-foreground">সর্বমোট:</span>
          <span className="text-xl lg:text-2xl font-bold text-primary">
            ৳{total.toLocaleString('bn-BD')}
          </span>
        </div>
      </div>

      <Button
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 py-5 lg:py-6 text-base lg:text-lg font-semibold"
        onClick={onCompleteSale}
        disabled={cartEmpty || isProcessing}
      >
        {isProcessing ? "প্রক্রিয়াকরণ..." : "💰 বিক্রয় সম্পন্ন করুন"}
      </Button>
    </div>
  );
}
