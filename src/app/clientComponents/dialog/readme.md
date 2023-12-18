### Controlling Visibility of Dialog using Redux vs Local State

Since the `EditBookDialog` is used in multiple places, I decided to use Redux to control the visibility of the dialog.

### Custom Validation Message for Form Message

You probably will notice the validation for Category is not the same as other, while other are simply using `match`, I am implementing some customized checking logic,it is due to [WIP - Integration of Form Component with other Radix Components](isMissingCategory)
