import React, { useState } from 'react';
import { useStore, Product, DiscountCode } from '../contexts/StoreContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Package, BarChart, Tag, FolderTree } from 'lucide-react';

export const Admin: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    discountCodes,
    addDiscountCode,
    updateDiscountCode,
    deleteDiscountCode,
    categories,
    addCategory,
    cart,
    getCartTotal,
  } = useStore();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isDiscountDialogOpen, setIsDiscountDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  // Product Form State
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    price: 0,
    originalPrice: 0,
    description: '',
    images: [''],
    category: '',
    sizes: [],
    stock: 0,
    onSale: false,
    featured: false,
    visible: true,
  });

  // Discount Form State
  const [discountForm, setDiscountForm] = useState<DiscountCode>({
    code: '',
    discount: 0,
    active: true,
  });

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.category) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
      toast.success('Producto actualizado correctamente');
    } else {
      const newProduct: Product = {
        ...productForm as Product,
        id: Date.now().toString(),
      };
      addProduct(newProduct);
      toast.success('Producto creado correctamente');
    }

    resetProductForm();
    setIsProductDialogOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm(product);
    setIsProductDialogOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct(id);
      toast.success('Producto eliminado');
    }
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      price: 0,
      originalPrice: 0,
      description: '',
      images: [''],
      category: '',
      sizes: [],
      stock: 0,
      onSale: false,
      featured: false,
      visible: true,
    });
  };

  const handleSaveDiscount = () => {
    if (!discountForm.code || discountForm.discount <= 0) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    addDiscountCode(discountForm);
    toast.success('Código de descuento creado');
    setDiscountForm({ code: '', discount: 0, active: true });
    setIsDiscountDialogOpen(false);
  };

  const handleAddCategory = () => {
    if (!newCategory) {
      toast.error('Ingresa un nombre para la categoría');
      return;
    }

    addCategory(newCategory);
    toast.success('Categoría agregada');
    setNewCategory('');
    setIsCategoryDialogOpen(false);
  };

  const totalRevenue = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalProducts = products.length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-gray-600">Gestiona tu tienda de forma sencilla</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Productos</p>
                <p className="text-3xl font-bold">{totalProducts}</p>
              </div>
              <Package className="h-12 w-12 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sin Stock</p>
                <p className="text-3xl font-bold">{outOfStock}</p>
              </div>
              <BarChart className="h-12 w-12 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">En Carrito</p>
                <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
              <Tag className="h-12 w-12 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="discounts">Descuentos</TabsTrigger>
            <TabsTrigger value="categories">Categorías</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Productos</h2>
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetProductForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Producto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="name">Nombre *</Label>
                      <Input
                        id="name"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Precio *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="originalPrice">Precio Original</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          step="0.01"
                          value={productForm.originalPrice || ''}
                          onChange={(e) => setProductForm({ ...productForm, originalPrice: parseFloat(e.target.value) || undefined })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Categoría *</Label>
                      <Select
                        value={productForm.category}
                        onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="sizes">Talles (separados por coma)</Label>
                      <Input
                        id="sizes"
                        placeholder="S, M, L, XL"
                        value={productForm.sizes?.join(', ')}
                        onChange={(e) => setProductForm({
                          ...productForm,
                          sizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="images">URLs de Imágenes (una por línea)</Label>
                      <Textarea
                        id="images"
                        value={productForm.images?.join('\n')}
                        onChange={(e) => setProductForm({
                          ...productForm,
                          images: e.target.value.split('\n').filter(Boolean)
                        })}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="onSale">En Oferta</Label>
                        <Switch
                          id="onSale"
                          checked={productForm.onSale}
                          onCheckedChange={(checked) => setProductForm({ ...productForm, onSale: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="featured">Destacado</Label>
                        <Switch
                          id="featured"
                          checked={productForm.featured}
                          onCheckedChange={(checked) => setProductForm({ ...productForm, featured: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="visible">Visible en Tienda</Label>
                        <Switch
                          id="visible"
                          checked={productForm.visible}
                          onCheckedChange={(checked) => setProductForm({ ...productForm, visible: checked })}
                        />
                      </div>
                    </div>

                    <Button onClick={handleSaveProduct} className="w-full">
                      {editingProduct ? 'Actualizar' : 'Crear'} Producto
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {product.featured && <Badge variant="outline">Destacado</Badge>}
                          {product.onSale && <Badge className="bg-red-500">Oferta</Badge>}
                          {!product.visible && <Badge variant="secondary">Oculto</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Discounts Tab */}
          <TabsContent value="discounts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Códigos de Descuento</h2>
              <Dialog open={isDiscountDialogOpen} onOpenChange={setIsDiscountDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Código
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nuevo Código de Descuento</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="code">Código</Label>
                      <Input
                        id="code"
                        value={discountForm.code}
                        onChange={(e) => setDiscountForm({ ...discountForm, code: e.target.value.toUpperCase() })}
                        placeholder="VERANO20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="discount">Descuento (%)</Label>
                      <Input
                        id="discount"
                        type="number"
                        value={discountForm.discount}
                        onChange={(e) => setDiscountForm({ ...discountForm, discount: parseInt(e.target.value) })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="active">Activo</Label>
                      <Switch
                        id="active"
                        checked={discountForm.active}
                        onCheckedChange={(checked) => setDiscountForm({ ...discountForm, active: checked })}
                      />
                    </div>

                    <Button onClick={handleSaveDiscount} className="w-full">
                      Crear Código
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Descuento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {discountCodes.map((dc) => (
                    <TableRow key={dc.code}>
                      <TableCell className="font-mono font-semibold">{dc.code}</TableCell>
                      <TableCell>{dc.discount}%</TableCell>
                      <TableCell>
                        <Badge variant={dc.active ? 'default' : 'secondary'}>
                          {dc.active ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Switch
                            checked={dc.active}
                            onCheckedChange={(checked) =>
                              updateDiscountCode(dc.code, { active: checked })
                            }
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm('¿Eliminar este código?')) {
                                deleteDiscountCode(dc.code);
                                toast.success('Código eliminado');
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Categorías</h2>
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Categoría
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nueva Categoría</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="newCategory">Nombre de la Categoría</Label>
                      <Input
                        id="newCategory"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Chaquetas"
                      />
                    </div>

                    <Button onClick={handleAddCategory} className="w-full">
                      Agregar Categoría
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FolderTree className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">{category}</span>
                    </div>
                    <Badge variant="outline">
                      {products.filter(p => p.category === category).length}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
