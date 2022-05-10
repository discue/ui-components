# Headlines <Badge type="tip" text="since v0.6.0" vertical="top" />

A simple wrapper around a head- and subline to allow for a common look-and-feel and consistent styling. The actual html tags for the headline and subline can be configured via the properties `headlineTag` and `sublineTag`.

## Preview
<DynamicComponentDisplay type="Headlines" class="px-4" headlineTag="span" sublineTag="span">
    <template #headline>
        Enim consequat ad Lorem.
    </template>
    <template #subline>
        Commodo ipsum adipisicing amet dos.
    </template>
</DynamicComponentDisplay>

## Example
@[code](@examples/HeadlinesExample.vue)