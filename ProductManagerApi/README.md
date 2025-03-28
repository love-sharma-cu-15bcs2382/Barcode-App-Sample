# ProductManagerApi

This is a .NET 4.8 Web API application (`ProductManagerApi`) that serves as the backend for the `BarcodeScannerIonic` Ionic app. It provides an API endpoint (`/api/products`) to handle barcode data sent from the Ionic app, storing it in a database. This README provides detailed instructions to set up the development environment, install Visual Studio 2022, run the application, and troubleshoot common issues.

---

## Prerequisites

Before starting, ensure you have the following tools installed on your Windows machine. Download links and installation instructions are provided.

### 1. Visual Studio 2022

- **Purpose**: Visual Studio 2022 is the IDE used to develop, build, and debug the .NET 4.8 Web API application.
- **Download**: [Visual Studio 2022 Community Edition](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&rel=17)
  - Choose the Windows installer (`.exe`).
- **Installation**:
  1. Run the installer (`vs_community__*.exe`).
  2. In the Visual Studio Installer, select the following workloads:
     - **ASP.NET and web development** (includes .NET Framework 4.8 support).
     - **.NET desktop development** (optional, for additional tools).
  3. Click "Install" → Wait for the installation to complete (this may take 10-20 minutes depending on your system).
  4. Launch Visual Studio 2022 → Sign in with a Microsoft account (optional) → Choose your theme → Start.
  5. Verify installation:
     - Open Visual Studio 2022 → Help → About Microsoft Visual Studio → Confirm version is `17.11.5` (or latest).

### 2. .NET Framework 4.8 Developer Pack

- **Purpose**: The .NET Framework 4.8 Developer Pack is required to build and run .NET 4.8 applications.
- **Download**: [.NET Framework 4.8 Developer Pack](https://dotnet.microsoft.com/en-us/download/dotnet-framework/net48)
  - Choose the Developer Pack (`.exe`).
- **Installation**:
  1. Run the installer (`ndp48-devpack-enu.exe`).
  2. Follow the prompts → Accept the license → Install.
  3. Verify installation:
     - Open Command Prompt:
       ```
       reg query "HKLM\SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full" /v Version
       ```
     - Expected: `4.8.*` (e.g., `4.8.04084`).

### 3. SQL Server (Optional, for Database)

- **Purpose**: SQL Server is used to store product data (if your app uses a database like Entity Framework with SQL Server).
- **Download**: [SQL Server 2022 Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
  - Choose the Express edition (free).
- **Installation**:
  1. Run the installer (`SQL2022-SSEI-Expr.exe`).
  2. Choose "Basic" installation → Follow the prompts → Install.
  3. Note the instance name (e.g., `SQLEXPRESS`).
  4. Install SQL Server Management Studio (SSMS) for managing the database:
     - **Download**: [SSMS](https://aka.ms/ssmsfullsetup)
     - Run the installer (`SSMS-Setup-ENU.exe`) → Install.
  5. Verify installation:
     - Open SSMS → Connect to `localhost\SQLEXPRESS` → Confirm connection.

### 4. Git (Optional, for Version Control)

- **Purpose**: To clone repositories or manage version control.
- **Download**: [Git for Windows](https://github.com/git-for-windows/git/releases/download/v2.46.0.windows.1/Git-2.46.0-64-bit.exe)
  - Choose the Windows installer (`.exe`).
- **Installation**:
  1. Run the installer (`Git-2.46.0-64-bit.exe`).
  2. Follow the prompts → Use default settings.
  3. Verify:
     ```
     git --version
     ```
     - Expected: `git version 2.46.0.windows.1`.

### 5. Postman (Optional, for API Testing)

- **Purpose**: Postman is used to test the API endpoints (e.g., `POST /api/products`).
- **Download**: [Postman for Windows](https://dl.pstmn.io/download/latest/win64)
  - Choose the Windows installer (`.exe`).
- **Installation**:
  1. Run the installer (`Postman-win64-*.exe`).
  2. Follow the prompts → Install.
  3. Launch Postman → Sign in (optional) or skip.

---

## Project Setup

### 1. Clone or Navigate to the Project

### 2. Open the Project in Visual Studio 2022

- Open the solution file:
  ```
  E:\Backend\ProductManagerApi.sln
  ```
- Visual Studio 2022 will load the solution, including the `ProductManagerApi` project.

### 3. Restore NuGet Packages

- Restore the project’s NuGet packages (e.g., `Microsoft.AspNet.WebApi.Cors`, `System.Buffers`):
  - In Visual Studio 2022: Tools → NuGet Package Manager → Manage NuGet Packages for Solution → Click "Restore".
- Alternatively, via Command Prompt:
  ```
  cd E:\Backend\ProductManagerApi
  nuget restore ProductManagerApi.sln
  ```
- This installs dependencies listed in `packages.config` (e.g., `Microsoft.AspNet.WebApi.Cors`).

### 4. Configure the Database (If Applicable)

- If your project uses a database (e.g., via Entity Framework):
  1. Update the connection string in `Web.config`:
     ```xml
     <connectionStrings>
       <add name="DefaultConnection" connectionString="Server=localhost\SQLEXPRESS;Database=ProductManagerDb;Trusted_Connection=True;" providerName="System.Data.SqlClient" />
     </connectionStrings>
     ```
  2. Run database migrations (if using Entity Framework):
     - Open Package Manager Console: Tools → NuGet Package Manager → Package Manager Console.
     - Run:
       ```
       Update-Database
       ```
  3. Verify the database is created in SSMS (`localhost\SQLEXPRESS` → `ProductManagerDb`).

---

## Running the Application

### 1. Build the Solution

- In Visual Studio 2022:
  - Build → Build Solution (or press F6).
- Alternatively, via Command Prompt:
  ```
  cd E:\Backend\ProductManagerApi
  msbuild ProductManagerApi.sln
  ```

### 2. Run the Application

- In Visual Studio 2022:
  - Press F5 to start debugging → The API will run on `https://localhost:44372` (or the port specified in project properties).
  - A browser will open to the root URL (e.g., `https://localhost:44372`).
- Alternatively, via Command Prompt (after building):
  ```
  cd E:\Backend\ProductManagerApi\bin
  ProductManagerApi.exe
  ```
- **API Endpoint**:
  - The main endpoint is `POST /api/products`, which accepts a JSON payload like:
    ```json
    { "barcode": "3728957328" }
    ```

### 3. Test the API with Postman

- Open Postman.
- Create a new request:
  - Method: `POST`
  - URL: `https://localhost:44372/api/products`
  - Headers:
    - `Authorization: Bearer 6dV7erQDQ`
    - `Content-Type: application/json`
  - Body (raw JSON):
    ```json
    { "barcode": "3728957328" }
    ```
- Send the request → Verify the response (e.g., `200 OK` with `{ "barcode": "3728957328", "message": "Product added successfully" }`).

---

## Troubleshooting

- **Build Fails**:
  - Ensure all NuGet packages are restored (see "Restore NuGet Packages" above).
  - Check for missing dependencies in `packages.config` → Install via NuGet Package Manager.
  - Verify .NET Framework 4.8 is installed (see Prerequisites).

- **Assembly Load Errors** (e.g., `System.Buffers`):
  - Add a binding redirect in `Web.config`:
    ```xml
    <configuration>
      <runtime>
        <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
          <dependentAssembly>
            <assemblyIdentity name="System.Buffers" publicKeyToken="cc7b13ffcd2ddd51" culture="neutral" />
            <bindingRedirect oldVersion="0.0.0.0-4.5.1.0" newVersion="4.5.1.0" />
          </dependentAssembly>
        </assemblyBinding>
      </runtime>
    </configuration>
    ```
  - Clean and rebuild the solution: Build → Clean Solution → Build → Rebuild Solution.

- **CORS Errors**:
  - Ensure CORS is enabled in `WebApiConfig.cs`:
    ```csharp
    var cors = new EnableCorsAttribute("http://localhost:8100,http://192.168.1.100:8100", "Content-Type,Authorization,X-Api-Key", "GET,POST,OPTIONS");
    config.EnableCors(cors);
    ```
  - Add a preflight handler if needed:
    ```csharp
    config.MessageHandlers.Add(new PreflightRequestsHandler());

    public class PreflightRequestsHandler : DelegatingHandler
    {
        protected override async System.Threading.Tasks.Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
        {
            if (request.Method == HttpMethod.Options)
            {
                var response = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
                response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:8100");
                response.Headers.Add("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
                response.Headers.Add("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Api-Key");
                return response;
            }
            return await base.SendAsync(request, cancellationToken);
        }
    }
    ```

- **401 Unauthorized**:
  - Ensure the `Authorization: Bearer 6dV7erQDQ` token matches what the API expects.
  - Check `ApiKeyAuthFilter` (in `ProductManagerApi.Filters`) → Add `X-Api-Key` header if required:
    ```json
    "X-Api-Key": "your-secret-api-key"
    ```

- **Database Connection Errors**:
  - Verify the connection string in `Web.config` matches your SQL Server instance.
  - Ensure SQL Server is running: Open Services → Look for `SQL Server (SQLEXPRESS)` → Start if stopped.
  - Test the connection in SSMS: Connect to `localhost\SQLEXPRESS`.

---

## Project Structure

```
E:\Backend\ProductManagerApi\
  ProductManagerApi.sln
  ProductManagerApi\
    Controllers\
      ProductsController.cs
    Filters\
      ApiKeyAuthFilter.cs
    Models\
      Product.cs
    WebApiConfig.cs
    Web.config
    packages.config
  ...
```

---

## Additional Notes

- **Frontend Dependency**:
  - This API is designed to work with the `BarcodeScannerIonic` Ionic app, which sends requests to `https://localhost:44372/api/products`.
  - Ensure the Ionic app uses the correct `Authorization: Bearer 6dV7erQDQ` token.

- **Production Deployment**:
  - Deploy the API to IIS or a cloud service (e.g., Azure App Service).
  - Update the `BarcodeScannerIonic` app’s `BackendService` to use the production URL (e.g., `https://your-backend-domain/api/products`).
  - Secure the API with proper authentication (e.g., JWT with a dynamic token).

- **Dynamic Tokens**:
  - If the Bearer token (`6dV7erQDQ`) is dynamic, implement a token generation endpoint (e.g., `/api/auth/login`) and use OWIN JWT:
    ```csharp
    using Microsoft.Owin;
    using Microsoft.Owin.Security.Jwt;
    using Owin;

    [assembly: OwinStartup(typeof(ProductManagerApi.Startup))]
    namespace ProductManagerApi
    {
        public class Startup
        {
            public void Configuration(IAppBuilder app)
            {
                app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions
                {
                    TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = false,
                        ValidateIssuerSigningKey = false,
                        IssuerSigningKey = null
                    }
                });
            }
        }
    }
    ```

---
