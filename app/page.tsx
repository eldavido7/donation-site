"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { CreditCard, Bitcoin, Heart, Shield, Users, Target } from "lucide-react"

type PaymentStatus = "idle" | "processing" | "completed" | "failed"
type PaymentMethod = "paypal" | "btc"

export default function DonationPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal")
  const [amount, setAmount] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleDonation = async () => {
    setPaymentStatus("processing")

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("completed")
    }, 3000)
  }

  const presetAmounts = [25, 50, 100, 250, 500]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">DonateHeart</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#donate" className="text-gray-600 hover:text-gray-900 transition-colors">
                Donate
              </a>
              <a href="#impact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Impact
              </a>
              <a href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                Admin
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Make a Difference Today</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your donation helps us create positive change in communities around the world. Every contribution, no matter
            the size, makes a meaningful impact.
          </p>
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">10K+ Lives Impacted</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">95% Goal Reached</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600">Secure Payments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section id="donate" className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900">Choose Your Donation</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Select your preferred payment method and amount
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {paymentStatus === "idle" && (
                <>
                  {/* Amount Selection */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Donation Amount</Label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {presetAmounts.map((preset) => (
                        <Button
                          key={preset}
                          variant={amount === preset.toString() ? "default" : "outline"}
                          onClick={() => setAmount(preset.toString())}
                          className="h-12"
                        >
                          ${preset}
                        </Button>
                      ))}
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Custom amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-12 text-lg pl-8"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Payment Method</Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                        <Label
                          htmlFor="paypal"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                        >
                          <CreditCard className="mb-3 h-8 w-8" />
                          <span className="font-semibold">PayPal</span>
                          <span className="text-sm text-muted-foreground">PayPal Balance or Card</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="btc" id="btc" className="peer sr-only" />
                        <Label
                          htmlFor="btc"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                        >
                          <Bitcoin className="mb-3 h-8 w-8" />
                          <span className="font-semibold">Bitcoin</span>
                          <span className="text-sm text-muted-foreground">BTC Payment</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Donor Information */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Your Information (Optional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={donorInfo.name}
                          onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={donorInfo.email}
                          onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Input
                        id="message"
                        value={donorInfo.message}
                        onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                        placeholder="Leave a message of support..."
                      />
                    </div>
                  </div>

                  {/* Payment Forms */}
                  <Tabs value={paymentMethod} className="w-full">
                    <TabsContent value="paypal" className="space-y-4">
                      <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <CreditCard className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                        <p className="text-sm text-gray-600 mb-4">
                          You will be redirected to PayPal to complete your payment
                        </p>
                        <div className="bg-white p-4 rounded border">
                          <p className="text-sm font-medium text-gray-700">
                            Pay securely with your PayPal balance or any card
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="btc" className="space-y-4">
                      <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <Bitcoin className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                        <p className="text-sm text-gray-600 mb-4">
                          You will be redirected to complete your Bitcoin payment
                        </p>
                        <div className="bg-white p-3 rounded border text-xs font-mono break-all">
                          bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button onClick={handleDonation} className="w-full h-14 text-lg font-semibold" disabled={!amount}>
                    Donate ${amount || "0"} {paymentMethod === "btc" ? "via Bitcoin" : "via PayPal"}
                  </Button>
                </>
              )}

              {/* Payment Processing */}
              {paymentStatus === "processing" && (
                <div className="text-center space-y-6 py-8">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Processing Your Donation</h3>
                    <p className="text-gray-600">Please wait while we process your ${amount} donation...</p>
                  </div>
                  <Progress value={66} className="w-full" />
                </div>
              )}

              {/* Payment Success */}
              {paymentStatus === "completed" && (
                <div className="text-center space-y-6 py-8">
                  <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                    <Heart className="h-10 w-10 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-4">Your donation of ${amount} has been successfully processed.</p>
                    <Badge variant="secondary" className="mb-4">
                      Payment ID: DN-{Date.now().toString().slice(-6)}
                    </Badge>
                    <p className="text-sm text-gray-500">
                      A confirmation email will be sent to {donorInfo.email || "your email address"}.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setPaymentStatus("idle")
                      setAmount("")
                      setDonorInfo({ name: "", email: "", message: "" })
                    }}
                    variant="outline"
                  >
                    Make Another Donation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Your Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-2xl font-bold text-blue-600 mb-2">$25</h4>
              <p className="text-gray-600">Provides meals for a family of four</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-2xl font-bold text-green-600 mb-2">$100</h4>
              <p className="text-gray-600">Supplies educational materials for 10 children</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-2xl font-bold text-purple-600 mb-2">$500</h4>
              <p className="text-gray-600">Funds medical care for an entire community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold">DonateHeart</span>
          </div>
          <p className="text-gray-400 mb-4">Making the world a better place, one donation at a time.</p>
          <p className="text-sm text-gray-500">© 2025 DonateHeart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
