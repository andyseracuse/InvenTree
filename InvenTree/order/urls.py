"""
URL lookup for the Order app. Provides URL endpoints for:

- List view of Purchase Orders
- Detail view of Purchase Orders
"""

from django.conf.urls import url, include

from . import views

purchase_order_attachment_urls = [
    url(r'^new/', views.PurchaseOrderAttachmentCreate.as_view(), name='po-attachment-create'),
    url(r'^(?P<pk>\d+)/edit/', views.PurchaseOrderAttachmentEdit.as_view(), name='po-attachment-edit'),
    url(r'^(?P<pk>\d+)/delete/', views.PurchaseOrderAttachmentDelete.as_view(), name='po-attachment-delete'),
]

purchase_order_detail_urls = [

    url(r'^cancel/?', views.PurchaseOrderCancel.as_view(), name='po-cancel'),
    url(r'^edit/?', views.PurchaseOrderEdit.as_view(), name='po-edit'),
    url(r'^issue/?', views.PurchaseOrderIssue.as_view(), name='po-issue'),
    url(r'^receive/?', views.PurchaseOrderReceive.as_view(), name='po-receive'),
    url(r'^complete/?', views.PurchaseOrderComplete.as_view(), name='po-complete'),

    url(r'^export/?', views.PurchaseOrderExport.as_view(), name='po-export'),

    url(r'^notes/', views.PurchaseOrderNotes.as_view(), name='po-notes'),

    url(r'^attachments/', views.PurchaseOrderDetail.as_view(template_name='order/po_attachments.html'), name='po-attachments'),
    url(r'^.*$', views.PurchaseOrderDetail.as_view(), name='po-detail'),
]

po_line_item_detail_urls = [
    
    url(r'^edit/', views.POLineItemEdit.as_view(), name='po-line-item-edit'),
    url(r'^delete/', views.POLineItemDelete.as_view(), name='po-line-item-delete'),
]

po_line_urls = [

    url(r'^new/', views.POLineItemCreate.as_view(), name='po-line-item-create'),

    url(r'^(?P<pk>\d+)/', include(po_line_item_detail_urls)),
]

purchase_order_urls = [

    url(r'^new/', views.PurchaseOrderCreate.as_view(), name='po-create'),

    url(r'^order-parts/', views.OrderParts.as_view(), name='order-parts'),

    # Display detail view for a single purchase order
    url(r'^(?P<pk>\d+)/', include(purchase_order_detail_urls)),

    url(r'^line/', include(po_line_urls)),

    url(r'^attachments/', include(purchase_order_attachment_urls)),

    # Display complete list of purchase orders
    url(r'^.*$', views.PurchaseOrderIndex.as_view(), name='po-index'),
]

order_urls = [
    url(r'^purchase-order/', include(purchase_order_urls)),
]
