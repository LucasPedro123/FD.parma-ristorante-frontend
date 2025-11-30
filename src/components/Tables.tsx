import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Switch } from "./ui/switch";
import { Users, Check, Clock, Calendar, Plus, Trash2, DoorOpen, DoorClosed } from "lucide-react";
import { useTables } from "../contexts/TablesContext";

const waiters = ["Marco", "Sofia", "Giovanni", "Isabella", "Antonio", "Elena"];

export function Tables() {
  const { 
    tables, 
    isRestaurantOpen, 
    addTable, 
    removeTable, 
    updateTableStatus, 
    updateTableWaiter,
    toggleRestaurantOpen,
    updateTableTiming,
    toggleTableOpen,
  } = useTables();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTable, setNewTable] = useState({
    number: "",
    capacity: "4",
    waiter: "Marco",
  });

  const handleAddTable = () => {
    if (newTable.number.trim()) {
      addTable({
        number: newTable.number.padStart(2, '0'),
        status: "Free",
        waiter: newTable.waiter,
        capacity: parseInt(newTable.capacity),
        openingTime: "12:00",
        closingTime: "23:00",
        isOpen: true,
      });
      setNewTable({ number: "", capacity: "4", waiter: "Marco" });
      setIsAddDialogOpen(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Free":
        return {
          color: "bg-green-100 text-green-700 border-green-200",
          icon: Check,
          bgCard: "bg-green-50/50",
        };
      case "Occupied":
        return {
          color: "bg-red-100 text-red-700 border-red-200",
          icon: Users,
          bgCard: "bg-red-50/50",
        };
      case "Reserved":
        return {
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          icon: Calendar,
          bgCard: "bg-yellow-50/50",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-700 border-gray-200",
          icon: Clock,
          bgCard: "bg-gray-50/50",
        };
    }
  };

  const stats = {
    free: tables.filter(t => t.status === "Free").length,
    occupied: tables.filter(t => t.status === "Occupied").length,
    reserved: tables.filter(t => t.status === "Reserved").length,
    total: tables.length,
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-[#4b2e05]">Tables Management</h1>
            <p className="text-[#8b6f47]">Manage restaurant table status and assignments</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Card className={`border-[#c7a17a]/20 shadow-lg ${isRestaurantOpen ? 'bg-green-50/50' : 'bg-red-50/50'}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  {isRestaurantOpen ? (
                    <DoorOpen className="w-5 h-5 text-green-600" />
                  ) : (
                    <DoorClosed className="w-5 h-5 text-red-600" />
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-[#8b6f47]">Restaurant Status</span>
                    <Badge className={isRestaurantOpen ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>
                      {isRestaurantOpen ? 'OPEN' : 'CLOSED'}
                    </Badge>
                  </div>
                  <Button
                    onClick={toggleRestaurantOpen}
                    className={`ml-2 ${isRestaurantOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                  >
                    {isRestaurantOpen ? 'Close Restaurant' : 'Open Restaurant'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Table
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-[#c7a17a]/20">
              <DialogHeader>
                <DialogTitle className="text-[#4b2e05]">Add New Table</DialogTitle>
                <DialogDescription className="text-[#8b6f47]">
                  Create a new table for the restaurant
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="table-number" className="text-[#4b2e05]">Table Number</Label>
                  <Input
                    id="table-number"
                    placeholder="e.g., 26"
                    value={newTable.number}
                    onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
                    className="border-[#c7a17a]/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="table-capacity" className="text-[#4b2e05]">Capacity (Number of Seats)</Label>
                  <Select 
                    value={newTable.capacity} 
                    onValueChange={(value) => setNewTable({ ...newTable, capacity: value })}
                  >
                    <SelectTrigger className="border-[#c7a17a]/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 seats</SelectItem>
                      <SelectItem value="4">4 seats</SelectItem>
                      <SelectItem value="6">6 seats</SelectItem>
                      <SelectItem value="8">8 seats</SelectItem>
                      <SelectItem value="10">10 seats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="table-waiter" className="text-[#4b2e05]">Assigned Waiter</Label>
                  <Select 
                    value={newTable.waiter} 
                    onValueChange={(value) => setNewTable({ ...newTable, waiter: value })}
                  >
                    <SelectTrigger className="border-[#c7a17a]/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {waiters.map((waiter) => (
                        <SelectItem key={waiter} value={waiter}>{waiter}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="border-[#c7a17a]/30"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddTable}
                  className="bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white"
                >
                  Add Table
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#c7a17a]/10 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-[#c7a17a]" />
                </div>
                <div>
                  <p className="text-sm text-[#8b6f47]">Total Tables</p>
                  <p className="text-[#4b2e05]">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-[#8b6f47]">Free Tables</p>
                  <p className="text-[#4b2e05]">{stats.free}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-[#8b6f47]">Occupied Tables</p>
                  <p className="text-[#4b2e05]">{stats.occupied}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-[#8b6f47]">Reserved Tables</p>
                  <p className="text-[#4b2e05]">{stats.reserved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tables.map((table) => {
            const statusConfig = getStatusConfig(table.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <Card 
                key={table.id} 
                className={`border-[#c7a17a]/20 shadow-lg hover:shadow-xl transition-all duration-300 ${statusConfig.bgCard}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#4b2e05]">Table {table.number}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className={`${statusConfig.color === "bg-green-100 text-green-700 border-green-200" ? "bg-green-100" : statusConfig.color === "bg-red-100 text-red-700 border-red-200" ? "bg-red-100" : "bg-yellow-100"} p-2 rounded-lg`}>
                        <StatusIcon className={`w-4 h-4 ${statusConfig.color.includes("green") ? "text-green-600" : statusConfig.color.includes("red") ? "text-red-600" : "text-yellow-600"}`} />
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-card border-[#c7a17a]/20">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-[#4b2e05]">Delete Table {table.number}?</AlertDialogTitle>
                            <AlertDialogDescription className="text-[#8b6f47]">
                              This action cannot be undone. This will permanently delete the table from the system.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-[#c7a17a]/30">Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => removeTable(table.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#8b6f47]">Capacity:</span>
                      <Badge variant="outline" className="border-[#c7a17a]/30">
                        {table.capacity} seats
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#8b6f47]">Status:</span>
                      <Select 
                        value={table.status} 
                        onValueChange={(value: "Free" | "Occupied" | "Reserved") => updateTableStatus(table.id, value)}
                      >
                        <SelectTrigger className="w-32 h-8 border-[#c7a17a]/30 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Free">Free</SelectItem>
                          <SelectItem value="Occupied">Occupied</SelectItem>
                          <SelectItem value="Reserved">Reserved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {table.guests && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#8b6f47]">Guests:</span>
                        <Badge variant="outline" className="border-[#c7a17a]/30">
                          {table.guests} people
                        </Badge>
                      </div>
                    )}

                    {table.reservationName && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#8b6f47]">Reserved by:</span>
                        <span className="text-sm text-[#4b2e05]">{table.reservationName}</span>
                      </div>
                    )}

                    {table.reservationDate && table.reservationTime && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#8b6f47]">Time:</span>
                        <span className="text-xs text-[#4b2e05]">{table.reservationDate} {table.reservationTime}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#8b6f47]">Waiter:</span>
                      <Select 
                        value={table.waiter} 
                        onValueChange={(value) => updateTableWaiter(table.id, value)}
                      >
                        <SelectTrigger className="w-32 h-8 border-[#c7a17a]/30 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {waiters.map((waiter) => (
                            <SelectItem key={waiter} value={waiter}>{waiter}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border-t border-[#c7a17a]/20 pt-3 mt-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#8b6f47]">Table Status:</span>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={table.isOpen}
                            onCheckedChange={() => toggleTableOpen(table.id)}
                            className="data-[state=checked]:bg-[#c7a17a]"
                          />
                          <Badge variant="outline" className={table.isOpen ? "border-green-500 text-green-700" : "border-red-500 text-red-700"}>
                            {table.isOpen ? 'Open' : 'Closed'}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-[#8b6f47]">Operating Hours</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            value={table.openingTime}
                            onChange={(e) => updateTableTiming(table.id, e.target.value, table.closingTime)}
                            className="h-8 border-[#c7a17a]/30 text-xs"
                          />
                          <span className="text-xs text-[#8b6f47]">to</span>
                          <Input
                            type="time"
                            value={table.closingTime}
                            onChange={(e) => updateTableTiming(table.id, table.openingTime, e.target.value)}
                            className="h-8 border-[#c7a17a]/30 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
