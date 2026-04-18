package com.market.angel.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

@Component
public class DatabaseConnectionTest implements CommandLineRunner {

    private final DataSource dataSource;

    public DatabaseConnectionTest(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) {
        try (Connection connection = dataSource.getConnection()) {

            if (connection != null && !connection.isClosed()) {
                System.out.println("✅ Conexión a la base de datos EXITOSA");
                System.out.println("📌 URL: " + connection.getMetaData().getURL());
            }

        } catch (Exception e) {
            System.err.println("❌ Error al conectar a la base de datos");
            e.printStackTrace();
        }
    }
}