<template>
  <div class="about">
    
  

    
      <v-list-group
        v-for="item in items"
        :key="item.title"
        >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    
 

  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' },
          ],
          title: 'Departamentos',
        }
      ],
    }),
  }
</script>