# Generated by Django 4.2.2 on 2023-06-25 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tienda', '0003_rename_ape_materno_usuario_apellido_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='password',
            field=models.CharField(default='contrasena123', max_length=50),
        ),
    ]
