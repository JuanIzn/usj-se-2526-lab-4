class PayrollSystem {
  calculateSalary(params: {
    empId: number;
    hours: number;
    rate: number;
    isOvertime?: boolean;
    isWeekend?: boolean;
    hasBonus?: boolean;
    bonusAmount?: number;
    taxRate?: number;
    includeDeductions?: boolean;
  }): number {
    let {
      empId,
      hours,
      rate,
      isOvertime = false,
      isWeekend = false,
      hasBonus = false,
      bonusAmount = 0,
      taxRate = 0,
      includeDeductions = false
    } = params;

    let salary = hours * rate;

    if (isOvertime) salary *= 1.5;
    if (isWeekend) salary *= 2;
    if (hasBonus) salary += bonusAmount;

    const tax = salary * taxRate;

    if (includeDeductions) {
      const insurance = 100;
      const pension = salary * 0.05;
      salary -= tax + insurance + pension;
    } else {
      salary -= tax;
    }

    console.log("Salary for " + empId + ": $" + salary);
    return salary;
  }

  generateReport(params: {
    type: string;
    includeSummary?: boolean;
    includeDetails?: boolean;
    includeGraphs?: boolean;
    isPdf?: boolean;
    isEmail?: boolean;
    recipients?: string;
    startDate: string;
    endDate: string;
  }): void {
    let {
      type,
      includeSummary = false,
      includeDetails = false,
      includeGraphs = false,
      isPdf = false,
      isEmail = false,
      recipients = "",
      startDate,
      endDate
    } = params;

    console.log("Generating " + type + " report");
    console.log("From " + startDate + " to " + endDate);

    if (includeSummary) console.log("Adding summary");
    if (includeDetails) console.log("Adding details");
    if (includeGraphs) console.log("Adding graphs");
    console.log(isPdf ? "Export as PDF" : "Export as Excel");
    if (isEmail) console.log("Send to: " + recipients);
  }

  transferFunds(params: {
    fromAccount: string;
    toAccount: string;
    amount: number;
    currency: string;
    fee?: number;
    isUrgent?: boolean;
  }): boolean {
    let { fromAccount, toAccount, amount, currency, fee = 0, isUrgent = false } = params;

    console.log("Transfer from " + fromAccount + " to " + toAccount);
    console.log("Amount: " + amount + " " + currency);

    const totalAmount = isUrgent ? amount + fee + 10 : amount + fee;
    console.log("Total: " + totalAmount);

    if (amount > 0) {
      console.log("Transfer done");
      return true;
    }
    return false;
  }
}

function main03() {
  const payroll = new PayrollSystem();

  const salary = payroll.calculateSalary({
    empId: 101,
    hours: 40,
    rate: 25,
    isOvertime: true,
    hasBonus: true,
    bonusAmount: 200,
    taxRate: 0.2,
    includeDeductions: true
  });

  payroll.generateReport({
    type: "monthly",
    includeSummary: true,
    includeDetails: true,
    isPdf: true,
    isEmail: true,
    recipients: "boss@company.com",
    startDate: "2024-01-01",
    endDate: "2024-01-31"
  });

  payroll.transferFunds({
    fromAccount: "ACC123",
    toAccount: "ACC456",
    amount: 1000,
    currency: "USD",
    fee: 15,
    isUrgent: true
  });

  console.log("Calculated salary: " + salary);
}

main03();