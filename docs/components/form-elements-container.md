# FormElementsContainer <Badge type="tip" text="since v0.45.0" vertical="top" /> <Badge type="themeable" text="themeable" vertical="top" />
A `div` that ensure all child elements are well aligned.

## Preview
<DynamicComponentDisplay class="bg-stone-300" type="FormElementsContainer" id="FormElementsContainer">
  <FormInput 
    label="First Name" 
    description="Please enter your first name." 
    :show-format-hint="true"
    :show-pattern-hint="false"
    format="John Doe" />
  <FormInput 
    label="Second Name" 
    description="Please enter your second name."
    :show-format-hint="true"
    :show-pattern-hint="false"
    format="John Doe" />
  <FormInput 
    label="ZipCode" 
    description="Please enter a valid zip code." 
    :show-format-hint="true"
    :show-pattern-hint="false"
    format="85080" />
  <FormInput 
    label="City" 
    description="Please enter a valid zip city name." 
    :show-format-hint="true"
    :show-pattern-hint="false"
    format="New York" />
  <NavButton type="button">Submit</NavButton>
</DynamicComponentDisplay>

## Example
@[code](@examples/FormElementsContainerExample.vue)