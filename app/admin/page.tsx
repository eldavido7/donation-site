"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Users, CreditCard, Bitcoin, Search, Download, Filter } from "lucide-react"

type Payment = {
  id: string
  amount: number
  method: "paypal" | "btc"
  status: "completed" | "processing" | "failed"
  donor: {
    name: string
    email: string
  }
  message?: string
  timestamp: Date
  transactionId: string
}

export default function AdminDashboard() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "processing" | "failed">("all")

  // Mock data - in real app, this would come from your backend
  useEffect(() => {
    const mockPayments: Payment[] = [
      {
        id: "1",
        amount: 100,
        method: "paypal",
        status: "completed",
        donor: { name: "John Doe", email: "john@example.com" },
        message: "Keep up the great work!",
        timestamp: new Date("2024-01-15T10:30:00"),
        transactionId: "pp_1234567890",
      },
      {
        id: "2",
        amount: 250,
        method: "btc",
        status: "completed",
        donor: { name: "Jane Smith", email: "jane@example.com" },
        timestamp: new Date("2024-01-14T15:45:00"),
        transactionId: "btc_abcdef123456",
      },
      {
        id: "3",
        amount: 50,
        method: "paypal",
        status: "processing",
        donor: { name: "Bob Johnson", email: "bob@example.com" },
        message: "Happy to help!",
        timestamp: new Date("2024-01-14T09:15:00"),
        transactionId: "pp_0987654321",
      },
      {
        id: "4",
        amount: 500,
        method: "btc",
        status: "completed",
        donor: { name: "Alice Brown", email: "alice@example.com" },
        timestamp: new Date("2024-01-13T14:20:00"),
        transactionId: "btc_xyz789012345",
      },
      {
        id: "5",
        amount: 75,
        method: "paypal",
        status: "failed",
        donor: { name: "Charlie Wilson", email: "charlie@example.com" },
        timestamp: new Date("2024-01-13T11:00:00"),
        transactionId: "pp_failed123",
      },
    ]
    setPayments(mockPayments)
  }, [])

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || payment.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalDonations = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)
  const totalDonors = new Set(payments.filter((p) => p.status === "completed").map((p) => p.donor.email)).size
  const paypalPayments = payments.filter((p) => p.method === "paypal" && p.status === "completed").length
  const btcPayments = payments.filter((p) => p.method === "btc" && p.status === "completed").length

  const getStatusBadge = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
    }
  }

  const getMethodIcon = (method: Payment["method"]) => {
    return method === "paypal" ? <CreditCard className="h-4 w-4" /> : <Bitcoin className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalDonations.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDonors}</div>
              <p className="text-xs text-muted-foreground">+5 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PayPal Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paypalPayments}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((paypalPayments / (paypalPayments + btcPayments)) * 100)}% of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">BTC Payments</CardTitle>
              <Bitcoin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{btcPayments}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((btcPayments / (paypalPayments + btcPayments)) * 100)}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Track and manage all donation payments</CardDescription>
            <div className="flex space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search donations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                  <TabsTrigger value="failed">Failed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.donor.name}</div>
                        <div className="text-sm text-gray-500">{payment.donor.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${payment.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getMethodIcon(payment.method)}
                        <span className="capitalize">{payment.method === "paypal" ? "PayPal" : payment.method}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>{payment.timestamp.toLocaleDateString()}</TableCell>
                    <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                    <TableCell className="max-w-xs truncate">{payment.message || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
